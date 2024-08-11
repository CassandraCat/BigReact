import { Action } from 'shared/ReactTypes';

export interface Dispatcher {
	useState: <S>(initialState: S | (() => S)) => [S, Dispatch<S>];
	useEffect: (callback: () => void | void, deps: any[] | void) => void;
}

export type Dispatch<State> = (action: Action<State>) => void;

const currentDispatcher: { current: Dispatcher | null } = {
	current: null
};

export const resolveDispatcher = (): Dispatcher => {
	const dispatcher = currentDispatcher.current;
	if (dispatcher === null) {
		throw new Error('Invalid hook call');
	}
	return dispatcher;
};

export default currentDispatcher;
