import { Key, Props } from './../../shared/ReactTypes';
import {
	REACT_ELEMENT_TYPE,
	REACT_FRAGMENT_TYPE
} from './../../shared/ReactSymbols';
import { ReactElementType } from 'shared/ReactTypes';
import {
	createFiberFromELement,
	createFiberFromFragment,
	createWorkInProgress,
	FiberNode
} from './fiber';
import { ChildDeletion, Placement } from './fiberFlags';
import { Fragment, HostText } from './workTags';

type ExistingChildren = Map<string | number, FiberNode>;

function useFiber(fiber: FiberNode, pendingProps: Props): FiberNode {
	const clone = createWorkInProgress(fiber, pendingProps);
	clone.index = 0;
	clone.sibling = null;
	return clone;
}

function updateFragment(
	returnFiber: FiberNode,
	current: FiberNode | undefined,
	elements: any[],
	key: Key,
	existingChildren: ExistingChildren
) {
	let fiber;
	if (!current || current.tag !== Fragment) {
		fiber = createFiberFromFragment(elements, key);
	} else {
		existingChildren.delete(key);
		fiber = useFiber(current, elements);
	}
	fiber.return = returnFiber;
	return fiber;
}

function ChildReconciler(shouldTrackEffects: boolean) {
	function deleteChild(returnFiber: FiberNode, childToDelete: FiberNode) {
		if (!shouldTrackEffects) return;
		const deletions = returnFiber.deletions;
		if (deletions === null) {
			returnFiber.deletions = [childToDelete];
			returnFiber.flags |= ChildDeletion;
		} else {
			deletions.push(childToDelete);
		}
	}

	function deleteRemainingChildren(
		returnFiber: FiberNode,
		currentFirstChild: FiberNode | null
	) {
		if (!shouldTrackEffects) {
			return;
		}
		let childToDelete = currentFirstChild;
		while (childToDelete !== null) {
			deleteChild(returnFiber, childToDelete);
			childToDelete = childToDelete.sibling;
		}
	}

	function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElementType
	) {
		const key = element.key;
		while (currentFiber !== null) {
			// update
			if (currentFiber.key === key) {
				// same key
				if (element.$$typeof === REACT_ELEMENT_TYPE) {
					if (currentFiber.type === element.type) {
						// same type
						let props = element.props;
						if (element.type === REACT_FRAGMENT_TYPE) {
							props = element.props.children;
						}
						const existing = useFiber(currentFiber, props);
						existing.return = returnFiber;
						deleteRemainingChildren(returnFiber, currentFiber.sibling);
						return existing;
					}

					// different type
					deleteRemainingChildren(returnFiber, currentFiber);
					break;
				} else {
					if (__DEV__) {
						console.error('Unknown child type', element);
						break;
					}
				}
			} else {
				deleteChild(returnFiber, currentFiber);
				currentFiber = currentFiber.sibling;
			}
		}
		let fiber;
		if (element.type === REACT_FRAGMENT_TYPE) {
			fiber = createFiberFromFragment(element.props.children, key);
		} else {
			fiber = createFiberFromELement(element);
		}
		fiber.return = returnFiber;
		return fiber;
	}

	function reconcileSingleTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number
	) {
		while (currentFiber !== null) {
			// update
			if (currentFiber.tag === HostText) {
				// same type
				const existing = useFiber(currentFiber, { content });
				existing.return = returnFiber;
				deleteRemainingChildren(returnFiber, currentFiber.sibling);
				return existing;
			}
			deleteChild(returnFiber, currentFiber);
			currentFiber = currentFiber.sibling;
		}
		const fiber = new FiberNode(HostText, null, { content });
		fiber.return = returnFiber;
		return fiber;
	}

	function reconcileChildrenArray(
		returnFiber: FiberNode,
		currentFirstChild: FiberNode | null,
		newChildren: Array<any>
	) {
		let lastPlacedIndex: number = 0;
		let lastNewFiber: FiberNode | null = null;
		let firstNewFiber: FiberNode | null = null;

		const existingChildren: ExistingChildren = new Map();
		let current = currentFirstChild;

		while (current !== null) {
			const keyToUse = current.key === null ? current.index : current.key;
			existingChildren.set(keyToUse, current);
			current = current.sibling;
		}

		for (let i = 0; i < newChildren.length; i++) {
			const after = newChildren[i];
			const newFiber = updateFromMap(returnFiber, existingChildren, i, after);

			if (newFiber === null) {
				continue;
			}

			newFiber.index = i;
			newFiber.return = returnFiber;

			if (lastNewFiber === null) {
				firstNewFiber = newFiber;
				lastNewFiber = newFiber;
			} else {
				lastNewFiber.sibling = newFiber;
				lastNewFiber = lastNewFiber.sibling;
			}

			if (!shouldTrackEffects) {
				continue;
			}

			const current = newFiber.alternate;
			if (current !== null) {
				const oldIndex = current.index;
				if (oldIndex < lastPlacedIndex) {
					// move
					newFiber.flags |= Placement;
					continue;
				} else {
					// not move
					lastPlacedIndex = oldIndex;
				}
			} else {
				newFiber.flags |= Placement;
			}
		}

		existingChildren.forEach((fiber) => {
			deleteChild(returnFiber, fiber);
		});
		return firstNewFiber;
	}

	function getElementKeyToUse(element: any, index?: number): Key {
		if (
			Array.isArray(element) ||
			typeof element === 'string' ||
			typeof element === 'number' ||
			element === undefined ||
			element === null
		) {
			return index;
		}
		return element.key !== null ? element.key : index;
	}

	function updateFromMap(
		returnFiber: FiberNode,
		existingChildren: ExistingChildren,
		index: number,
		element: any
	) {
		const keyToUse = getElementKeyToUse(element, index);
		const before = existingChildren.get(keyToUse);

		// ReactElement
		if (typeof element === 'object' && element !== null) {
			if (Array.isArray(element)) {
				return updateFragment(
					returnFiber,
					before,
					element,
					keyToUse,
					existingChildren
				);
			}

			switch (element.$$typeof) {
				case REACT_ELEMENT_TYPE:
					if (element.type === REACT_FRAGMENT_TYPE) {
						return updateFragment(
							returnFiber,
							before,
							element,
							keyToUse,
							existingChildren
						);
					}
					if (before) {
						if (before.type === element.type) {
							existingChildren.delete(keyToUse);
							return useFiber(before, element.props);
						}
					}
					return createFiberFromELement(element);
				default:
					if (__DEV__) {
						console.error('Unknown child type', element);
					}
					break;
			}
		}

		// HostText
		if (typeof element === 'string' || typeof element === 'number') {
			if (before) {
				if (before.tag === HostText) {
					existingChildren.delete(keyToUse);
					return useFiber(before, { content: element + '' });
				}
			}
			return new FiberNode(HostText, null, { content: element + '' });
		}

		return null;
	}

	function placeSingleChild(fiber: FiberNode) {
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags |= Placement;
		}
		return fiber;
	}

	return function reconcileChildFibers(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		newChild?: ReactElementType
	) {
		const isUnlabeledTopLevelFragment =
			typeof newChild === 'object' &&
			newChild !== null &&
			newChild.type === REACT_FRAGMENT_TYPE &&
			newChild.key === null;
		if (isUnlabeledTopLevelFragment) {
			newChild = newChild?.props.children;
		}

		if (typeof newChild === 'object' && newChild !== null) {
			if (Array.isArray(newChild)) {
				return reconcileChildrenArray(returnFiber, currentFiber, newChild);
			}
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(
						reconcileSingleElement(returnFiber, currentFiber, newChild)
					);
				default:
					if (__DEV__) {
						console.error('Unknown child type', newChild);
					}
					break;
			}
		}

		// HostText
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(
				reconcileSingleTextNode(returnFiber, currentFiber, newChild)
			);
		}

		if (currentFiber !== null) {
			// boundaries
			deleteChild(returnFiber, currentFiber);
		}

		if (__DEV__) {
			console.error('Unknown child type', newChild);
		}

		return null;
	};
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
