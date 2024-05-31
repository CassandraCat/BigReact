import { Props } from './../../shared/ReactTypes';
import { Key, Ref, Type } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
	type: Type;
	tag: WorkTag;
	key: Key;
	ref: Ref;
	pendingProps: Props;
	stateNode: any;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	memorizedProps: Props | null;
	memorizedState: any;
	alternate: FiberNode | null;
	flags: Flags;

	constructor(tag: WorkTag, key: Key, pendingProps: Props) {
		this.tag = tag;
		this.key = key;
		this.ref = null;
		this.stateNode = null;
		this.type = null;

		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.pendingProps = pendingProps;
		this.memorizedProps = null;
		this.alternate = null;
		this.flags = NoFlags;
	}
}
