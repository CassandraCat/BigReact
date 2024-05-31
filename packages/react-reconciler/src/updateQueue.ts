import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}

export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

export const createUpdateQueue = <State>(): UpdateQueue<State> => {
	return {
		shared: {
			pending: null
		}
	};
};

export const enqueueUpdate = <State>(
	queue: UpdateQueue<State>,
	update: Update<State>
) => {
	queue.shared.pending = update;
};

export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memorizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memorizedState: baseState
	};

	if (pendingUpdate) {
		const { action } = pendingUpdate;
		if (action instanceof Function) {
			result.memorizedState = action(baseState);
		} else {
			result.memorizedState = action;
		}
	}

	return result;
};
