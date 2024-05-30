import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	ElementType,
	Key,
	Props,
	ReactElementType,
	Ref,
	Type
} from 'shared/ReactTypes';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'CatZhang'
	};
	return element;
};

export function isValidElement(object: ReactElementType | unknown): boolean {
	return (
		typeof object === 'object' &&
		object !== null &&
		(object as ReactElementType).$$typeof === REACT_ELEMENT_TYPE
	);
}

export const createElement = (
	type: ElementType,
	config: any,
	...maybeChildren: unknown[]
) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const value = config[prop];
		if (Object.prototype.hasOwnProperty.call(config, prop)) {
			if (prop === 'key') {
				if (value) {
					key = '' + value;
				}
				continue;
			}
			if (prop === 'ref') {
				if (value) {
					ref = value;
				}
				continue;
			}
			props[prop] = value;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsx = (type: ElementType, config: any, maybeKey: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	if (maybeKey) {
		key = '' + maybeKey;
	}

	for (const prop in config) {
		if (Object.prototype.hasOwnProperty.call(config, prop)) {
			const value = config[prop];
			if (prop === 'key') {
				if (value) {
					key = '' + value;
				}
				continue;
			}
			if (prop === 'ref') {
				if (value) {
					ref = value;
				}
				continue;
			}
			props[prop] = value;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
