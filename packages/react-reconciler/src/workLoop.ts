import { scheduleMicroTask } from 'hostConfig';
import { beginWork } from './beginWork';
import {
	commitHookEffectListCreate,
	commitHookEffectListDestroy,
	commitHookEffectListUnmount,
	commitMutationEffects
} from './commitWork';
import { completeWork } from './completeWork';
import {
	createWorkInProgress,
	FiberNode,
	FiberRootNode,
	PendingPassiveEffects
} from './fiber';
import { MutationMask, NoFlags, PassiveMask } from './fiberFlags';
import {
	getHighestPriorityLane,
	Lane,
	lanesToSchedulerPriority,
	markRootFinished,
	mergeLanes,
	NoLane,
	SyncLane
} from './fiberLanes';
import { flushSyncCallbacks, scheduleSyncCallback } from './syncTaskQueue';
import { HostRoot } from './workTags';
import { HookHasEffect, Passive } from './hookEffectTags';
import {
	unstable_NormalPriority as NormalPriority,
	unstable_scheduleCallback as scheduleCallback,
	unstable_shouldYield as shouldYield,
	unstable_cancelCallback as cancelCallback
} from 'scheduler';

let workInProgress: FiberNode | null = null;
let wipRootRenderLane: Lane = NoLane;
let rootDoesHavePassiveEffects: boolean = false;

type RootExitStatus = number;
const RootInComplete = 1;
const RootCompleted = 2;

export function scheduleUpdateOnFiber(fiber: FiberNode, lane: Lane) {
	// TODO Schedule
	const root = markUpdateFromFiberToRoot(fiber);
	markRootUpdated(root, lane);
	ensureRootIsScheduled(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = fiber.return;
	while (parent) {
		node = parent;
		parent = parent.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

function markRootUpdated(root: FiberRootNode, lane: Lane) {
	root.pendingLanes = mergeLanes(root.pendingLanes, lane);
}

function ensureRootIsScheduled(root: FiberRootNode) {
	const updateLane = getHighestPriorityLane(root.pendingLanes);
	const existingCallbackNode = root.callbackNode;

	if (updateLane === NoLane) {
		if (existingCallbackNode !== null) {
			cancelCallback(existingCallbackNode);
		}
		root.callbackLane = NoLane;
		root.callbackNode = null;
		return;
	}

	const currentLane = updateLane;
	const prevLane = root.callbackLane;
	if (currentLane === prevLane) {
		return;
	}

	if (existingCallbackNode !== null) {
		cancelCallback(existingCallbackNode);
	}

	let newCallbackNode = null;

	if (updateLane === SyncLane) {
		// Micro Task Schedule
		if (__DEV__) {
			console.warn('Schedule in Micro Task', updateLane);
		}
		scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root, updateLane));
		scheduleMicroTask(flushSyncCallbacks);
	} else {
		// Macro Task Schedule
		const schedulePriority = lanesToSchedulerPriority(updateLane);

		newCallbackNode = scheduleCallback(
			schedulePriority,
			// @ts-ignore
			performConcurrentWorkOnRoot.bind(null, root)
		);
	}
	root.callbackNode = newCallbackNode;
	root.callbackLane = currentLane;
}

function prepareFreshStack(root: FiberRootNode, lane: Lane) {
	root.finishedLane = NoLane;
	root.finishedWork = null;
	workInProgress = createWorkInProgress(
		root.current,
		root.current.pendingProps
	);
	wipRootRenderLane = lane;
}

function performConcurrentWorkOnRoot(
	root: FiberRootNode,
	didTimeout: boolean
): any {
	const currentCallbackNode = root.callbackNode;
	const didFlushPassiveEffect = flushPassiveEffects(root.pendingPassiveEffects);
	if (didFlushPassiveEffect) {
		if (root.callbackNode !== currentCallbackNode) {
			return null;
		}
	}

	const currentLane = root.callbackLane;

	if (currentLane === NoLane) {
		return null;
	}

	const needSync = currentLane === SyncLane || didTimeout;
	const exitStatus = renderRoot(root, currentLane, !needSync);

	ensureRootIsScheduled(root);

	if (exitStatus === RootInComplete) {
		// interrupt
		if (root.callbackNode !== currentCallbackNode) {
			return null;
		}
		return performConcurrentWorkOnRoot.bind(null, root);
	} else if (exitStatus === RootCompleted) {
		// completed
		const finishedWork = root.current.alternate;
		root.finishedWork = finishedWork;
		root.finishedLane = currentLane;
		wipRootRenderLane = NoLane;

		commitRoot(root);
	} else {
		if (__DEV__) {
			console.error('Should not have an exit status in concurrent render');
		}
	}
}

function renderRoot(
	root: FiberRootNode,
	lane: Lane,
	shouldTimeSlice: boolean
): RootExitStatus {
	if (__DEV__) {
		console.warn(`{shouldTimeSlice ? 'Concurrent' : 'Sync'} Render Start`);
	}

	if (wipRootRenderLane !== lane) {
		prepareFreshStack(root, lane);
	}

	do {
		try {
			shouldTimeSlice ? workLoopConcurrent() : workLoopSync();
			break;
		} catch (error) {
			if (__DEV__) {
				console.error('An error occurred in workLoop', error);
			}
			workInProgress = null;
		}
	} while (true);

	if (shouldTimeSlice && workInProgress !== null) {
		return RootInComplete;
	}

	if (!shouldTimeSlice && workInProgress !== null && __DEV__) {
		console.error('Should not have work left');
	}

	// TODO Error Handling

	return RootCompleted;
}

function performSyncWorkOnRoot(root: FiberRootNode, lane: Lane) {
	const nextLane = getHighestPriorityLane(root.pendingLanes);

	if (nextLane !== SyncLane) {
		// Lower Priority
		// NoLane
		ensureRootIsScheduled(root);
		return;
	}

	const exitStatus = renderRoot(root, lane, false);

	if (exitStatus === RootCompleted) {
		const finishedWork = root.current.alternate;
		root.finishedWork = finishedWork;
		root.finishedLane = lane;
		wipRootRenderLane = NoLane;

		commitRoot(root);
	} else if (__DEV__) {
		console.error('Should not have an exit status in sync render');
	}
}

function commitRoot(root: FiberRootNode) {
	const finishedWork = root.finishedWork;
	if (!finishedWork) {
		return;
	}

	if (__DEV__) {
		console.warn('Commit Start', finishedWork);
	}

	const lane = root.finishedLane;

	if (lane === NoLane && __DEV__) {
		console.error('finishedLane in commit phase should not be NoLane');
	}

	root.finishedWork = null;
	root.finishedLane = NoLane;

	markRootFinished(root, lane);

	if (
		(finishedWork.flags & PassiveMask) !== NoFlags ||
		(finishedWork.subtreeFlags & PassiveMask) !== NoFlags
	) {
		if (!rootDoesHavePassiveEffects) {
			rootDoesHavePassiveEffects = true;
			scheduleCallback(NormalPriority, () => {
				flushPassiveEffects(root.pendingPassiveEffects);
			});
		}
	}

	const subtreeHasEffect =
		(finishedWork.subtreeFlags & MutationMask) !== NoFlags;
	const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;

	if (subtreeHasEffect || rootHasEffect) {
		// TODO Effect Execution
		// TODO BeforeMutation
		// Mutation
		commitMutationEffects(finishedWork, root);

		// Fiber: change tree
		root.current = finishedWork;
		// TODO Layout
	}

	rootDoesHavePassiveEffects = false;
	ensureRootIsScheduled(root);
}

function workLoopSync() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

function workLoopConcurrent() {
	while (workInProgress !== null && !shouldYield()) {
		performUnitOfWork(workInProgress);
	}
}

function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber, wipRootRenderLane);
	fiber.memorizedProps = fiber.pendingProps;

	if (!next) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		completeWork(node);
		const sibling = node.sibling;
		if (sibling) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node);
}

function flushPassiveEffects(pendingPassiveEffects: PendingPassiveEffects) {
	let didFlushPassiveEffect = false;

	pendingPassiveEffects.unmount.forEach((effect) => {
		didFlushPassiveEffect = true;
		commitHookEffectListUnmount(Passive, effect);
	});
	pendingPassiveEffects.unmount = [];

	pendingPassiveEffects.update.forEach((effect) => {
		didFlushPassiveEffect = true;
		commitHookEffectListDestroy(Passive | HookHasEffect, effect);
	});
	pendingPassiveEffects.update.forEach((effect) => {
		didFlushPassiveEffect = true;
		commitHookEffectListCreate(Passive | HookHasEffect, effect);
	});
	pendingPassiveEffects.update = [];

	flushSyncCallbacks();
	return didFlushPassiveEffect;
}
