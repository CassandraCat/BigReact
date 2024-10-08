import { Props } from 'shared/ReactTypes';

export interface Container {
	rootID: number;
	children: (Instance | TextInstance)[];
}

export interface Instance {
	id: number;
	type: string;
	children: (Instance | TextInstance)[];
	parent: number;
	props: Props;
}
export interface TextInstance {
	text: string;
	id: number;
	parent: number;
}

let instanceCounter = 0;

// export const createInstance = (type: string, props: any): Instance => {
export const createInstance = (type: string, props: Props): Instance => {
	const instance = {
		id: instanceCounter++,
		type,
		children: [],
		parent: -1,
		props
	};
	return instance;
};

export const appendInitialChild = (
	parent: Instance | Container,
	child: Instance
) => {
	// id
	const prevParentID = child.parent;
	const parentID = 'rootID' in parent ? parent.rootID : parent.id;

	if (prevParentID !== -1 && prevParentID !== parentID) {
		throw new Error('Cannot mount child repeatedly');
	}
	child.parent = parentID;
	parent.children.push(child);
};

export const createTextInstance = (content: string) => {
	const instance = {
		text: content,
		id: instanceCounter++,
		parent: -1
	};
	return instance;
};

export const appendChildToContainer = (parent: Container, child: Instance) => {
	// id
	const prevParentID = child.parent;

	if (prevParentID !== -1 && prevParentID !== parent.rootID) {
		throw new Error('Cannot mount child repeatedly');
	}
	child.parent = parent.rootID;
	parent.children.push(child);
};

export function updateTextInstance(
	textInstance: TextInstance,
	content: string
) {
	textInstance.text = content;
}

export function removeChild(
	child: Instance | TextInstance,
	container: Container
) {
	const index = container.children.indexOf(child);

	if (index === -1) {
		throw new Error('child not exist');
	}
	container.children.splice(index, 1);
}

export function insertChildToContainer(
	child: Instance,
	container: Container,
	before: Instance
) {
	const beforeIndex = container.children.indexOf(before);
	if (beforeIndex === -1) {
		throw new Error('before not exist');
	}
	const index = container.children.indexOf(child);
	if (index !== -1) {
		container.children.splice(index, 1);
	}
	container.children.splice(beforeIndex, 0, child);
}

export const scheduleMicroTask =
	typeof queueMicrotask === 'function'
		? queueMicrotask
		: typeof Promise === 'function'
		? (callback: (...args: any) => void) => Promise.resolve(null).then(callback)
		: setTimeout;
