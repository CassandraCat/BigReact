import { Container, Instance } from 'hostConfig';
import { FiberNode } from './fiber';
import { NoFlags, Update } from './fiberFlags';
import {
	appendInitialChild,
	createInstance,
	createTextInstance
} from 'hostConfig';
import {
	Fragment,
	FunctionComponent,
	HostComponent,
	HostRoot,
	HostText
} from './workTags';

function markUpdate(fiber: FiberNode) {
	fiber.flags |= Update;
}

export const completeWork = (wip: FiberNode) => {
	const newProps = wip.pendingProps;
	const current = wip.alternate;

	switch (wip.tag) {
		case HostComponent:
			if (current && wip.stateNode) {
				// update
				markUpdate(wip);
			} else {
				if (!newProps) {
					throw new Error('No props');
				}
				const instance = createInstance(wip.type, newProps);
				appendAllChildren(instance, wip);
				wip.stateNode = instance;
			}
			bubbleProperties(wip);
			return null;
		case HostText:
			if (current && wip.stateNode) {
				// update
				const oldText = current.memorizedProps?.content;
				const newText = newProps.content;
				if (oldText !== newText) {
					markUpdate(wip);
				}
			} else {
				if (!newProps) {
					throw new Error('No props');
				}
				wip.stateNode = createTextInstance(newProps.content);
			}
			bubbleProperties(wip);
			return null;
		case HostRoot:
		case FunctionComponent:
		case Fragment:
			bubbleProperties(wip);
			return null;
		default:
			if (__DEV__) {
				console.warn('Unknown fiber tag', wip);
			}
			break;
	}
	return wip;
};

function appendAllChildren(parent: Container | Instance, wip: FiberNode) {
	let node = wip.child;
	while (node !== null) {
		if (node.tag === HostComponent || node.tag === HostText) {
			appendInitialChild(parent, node.stateNode);
		} else if (node.child) {
			node.child.return = node;
			node = node.child;
			continue;
		}

		if (node === wip) {
			return;
		}

		while (node.sibling === null) {
			if (node.return === null || node.return === wip) {
				return;
			}
			node = node.return;
		}

		node.sibling.return = node.return;
		node = node.sibling;
	}
}

function bubbleProperties(wip: FiberNode) {
	let subtreeFlags = NoFlags;
	let child = wip.child;
	while (child) {
		subtreeFlags |= child.flags;
		subtreeFlags |= child.subtreeFlags;

		child.return = wip;
		child = child.sibling;
	}

	wip.subtreeFlags |= subtreeFlags;
}
