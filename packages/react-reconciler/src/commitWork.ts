import {
	appendChildToContainer,
	Container,
	insertChildToContainer,
	Instance,
	removeChild,
	updateTextInstance
} from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import {
	ChildDeletion,
	MutationMask,
	NoFlags,
	Placement,
	Update
} from './fiberFlags';
import {
	FunctionComponent,
	HostComponent,
	HostRoot,
	HostText
} from './workTags';

let nextEffect: FiberNode | null = null;

export const commitMutationEffects = (finishedWork: FiberNode) => {
	nextEffect = finishedWork;

	while (nextEffect) {
		const child: FiberNode | null = nextEffect.child;
		if (
			(nextEffect.subtreeFlags & MutationMask) !== NoFlags &&
			child !== null
		) {
			nextEffect = child;
		} else {
			bubble: while (nextEffect !== null) {
				commitMutationEffectsOnFiber(nextEffect);
				const sibling: FiberNode | null = nextEffect.sibling;

				if (sibling) {
					nextEffect = sibling;
					break bubble;
				}

				nextEffect = nextEffect.return;
			}
		}
	}
};

const commitMutationEffectsOnFiber = (finishedWork: FiberNode) => {
	const flags = finishedWork.flags;
	// Placement
	if ((flags & Placement) !== NoFlags) {
		commitPlacement(finishedWork);
		finishedWork.flags &= ~Placement;
	}

	// Update
	if ((flags & Update) !== NoFlags) {
		commitUpdate(finishedWork);
		finishedWork.flags &= ~Update;
	}
	// ChildDeletion
	if ((flags & ChildDeletion) !== NoFlags) {
		const deletions = finishedWork.deletions;
		if (deletions !== null) {
			deletions.forEach((childrenToDelete) => {
				commitDeletion(childrenToDelete);
			});
		}
	}
};

function recordHostChildrenToDelete(
	childrenToDelete: FiberNode[],
	unmountFiber: FiberNode
) {
	const lastOne = childrenToDelete[childrenToDelete.length - 1];

	if (!lastOne) {
		childrenToDelete.push(unmountFiber);
	} else {
		let node = lastOne.sibling;
		while (node !== null) {
			if (unmountFiber === node) {
				childrenToDelete.push(unmountFiber);
			}
			node = node.sibling;
		}
	}
}

function commitDeletion(childrenToDelete: FiberNode) {
	const rootChildrenToDelete: FiberNode[] = [];

	commitNestedComponent(childrenToDelete, (unmountFiber) => {
		switch (unmountFiber.tag) {
			case HostComponent:
				recordHostChildrenToDelete(rootChildrenToDelete, unmountFiber);

				// TODO unbind ref
				return;
			case HostText:
				recordHostChildrenToDelete(rootChildrenToDelete, unmountFiber);
				return;
			case FunctionComponent:
				// TODO useEffect
				// TODO unmount
				// TODO unbind ref
				return;
			default:
				if (__DEV__) {
					console.warn('Unhandled unmount type', unmountFiber);
				}
		}
	});

	if (rootChildrenToDelete.length > 0) {
		const hostParent = getHostParent(childrenToDelete);
		if (hostParent !== null) {
			rootChildrenToDelete.forEach((node) => {
				removeChild(node.stateNode, hostParent);
			});
		}
	}

	childrenToDelete.return = null;
	childrenToDelete.child = null;
}

function commitNestedComponent(
	root: FiberNode,
	onCommitUnmount: (fiber: FiberNode) => void
) {
	let node = root;
	while (true) {
		onCommitUnmount(node);

		if (node.child !== null) {
			node.child.return = node;
			node = node.child;
			continue;
		}

		if (node === root) {
			return;
		}

		while (node.sibling === null) {
			if (node.return === null || node.return === root) {
				return;
			}
			node = node.return;
		}

		node.sibling.return = node.return;
		node = node.sibling;
	}
}

function commitUpdate(finishedWork: FiberNode) {
	switch (finishedWork.tag) {
		case HostText:
			// updateTextInstance
			const text = finishedWork.memorizedProps.content;
			return updateTextInstance(finishedWork.stateNode, text);
		default:
			if (__DEV__) {
				console.warn('Unimplemented Update type', finishedWork);
			}
			break;
	}
}

const commitPlacement = (finishedWork: FiberNode) => {
	if (__DEV__) {
		console.warn('Perform Placement Action', finishedWork);
	}
	// parent DOM
	const hostParent = getHostParent(finishedWork);

	// sibling DOM
	const before = getHostSibling(finishedWork);

	// finishedWork ~~ DOM append parent DOM
	if (hostParent !== null) {
		insertOrAppendPlacementNodeIntoContainer(finishedWork, hostParent, before);
	}
};

const insertOrAppendPlacementNodeIntoContainer = (
	finishedWork: FiberNode,
	hostParent: Container,
	before?: Instance | null
) => {
	// fiber host
	if (finishedWork.tag === HostComponent || finishedWork.tag === HostText) {
		if (before) {
			insertChildToContainer(finishedWork.stateNode, hostParent, before);
		} else {
			appendChildToContainer(hostParent, finishedWork.stateNode);
		}
		return;
	}
	const child = finishedWork.child;
	if (child !== null) {
		insertOrAppendPlacementNodeIntoContainer(child, hostParent);
		let sibling = child.sibling;

		while (sibling !== null) {
			insertOrAppendPlacementNodeIntoContainer(sibling, hostParent);
			sibling = sibling.sibling;
		}
	}
};

const getHostParent = (fiber: FiberNode): Container | null => {
	let parent = fiber.return;

	while (parent) {
		const parentTag = parent.tag;
		// HostComponent HostRoot
		if (parentTag === HostComponent) {
			return parent.stateNode as Container;
		}
		if (parentTag === HostRoot) {
			return (parent.stateNode as FiberRootNode).container;
		}
		parent = parent.return;
	}
	if (__DEV__) {
		console.warn('未找到host parent');
	}
	return null;
};

function getHostSibling(fiber: FiberNode): Instance | null {
	let node: FiberNode = fiber;

	findHostSibling: while (true) {
		while (node.sibling === null) {
			const parent = node.return;
			if (
				parent === null ||
				parent.tag === HostComponent ||
				parent.tag === HostRoot
			) {
				return null;
			}
			node = parent;
		}

		node.sibling.return = node.return;
		node = node.sibling;

		while (node.tag !== HostComponent && node.tag !== HostText) {
			if ((node.flags & Placement) !== NoFlags) {
				continue findHostSibling;
			}

			if (node.child === null) {
				continue findHostSibling;
			}

			node.child.return = node;
			node = node.child;
		}

		if ((node.flags & Placement) === NoFlags) {
			return node.stateNode;
		}
	}
}
