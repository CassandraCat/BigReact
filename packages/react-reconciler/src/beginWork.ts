import { processUpdateQueue, UpdateQueue } from './updateQueue';
import { FiberNode } from './fiber';
import {
	FunctionComponent,
	HostComponent,
	HostRoot,
	HostText
} from './workTags';
import { ReactElementType } from 'shared/ReactTypes';
import { mountChildFibers, reconcileChildFibers } from './childFibers';
import { renderWithHooks } from './fiberHooks';

export const beginWork = (wip: FiberNode) => {
	switch (wip.tag) {
		case HostRoot:
			return updateHostRoot(wip);
		case HostComponent:
			return updateHostComponent(wip);
		case FunctionComponent:
			return updateFunctionComponent(wip);
		case HostText:
			return null;
		default:
			if (__DEV__) {
				console.warn('Unknown fiber tag');
			}
			break;
	}
	return wip;
};

function updateHostRoot(wip: FiberNode): FiberNode | null {
	const baseState = wip.memorizedState;
	const updateQueue = wip.updateQueue as UpdateQueue<ReactElementType>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	const { memorizedState } = processUpdateQueue(baseState, pending);
	wip.memorizedState = memorizedState;

	const nextChildren = wip.memorizedState;
	reconcileChildren(wip, nextChildren);
	return wip.child;
}

function updateHostComponent(wip: FiberNode) {
	const nextProps = wip.pendingProps;
	const nextChildren = nextProps.children;
	console.log(nextChildren);
	reconcileChildren(wip, nextChildren);
	return wip.child;
}

function updateFunctionComponent(wip: FiberNode) {
	const nextChildren = renderWithHooks(wip);
	reconcileChildren(wip, nextChildren);
	return wip.child;
}

function reconcileChildren(wip: FiberNode, children?: ReactElementType) {
	const current = wip.alternate;

	if (current) {
		wip.child = reconcileChildFibers(wip, current.child, children);
	} else {
		wip.child = mountChildFibers(wip, null, children);
	}
}
