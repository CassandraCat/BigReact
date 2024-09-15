import {
	unstable_ImmediatePriority as ImmediatePriority,
	unstable_UserBlockingPriority as UserBlockingPriority,
	unstable_NormalPriority as NormalPriority,
	unstable_LowPriority as LowPriority,
	unstable_IdlePriority as IdlePriority,
	unstable_scheduleCallback as scheduleCallback,
	unstable_shouldYield as shouldYield,
	unstable_getFirstCallbackNode as getFirstCallbackNode,
	unstable_cancelCallback as cancelCallback,
	CallbackNode
} from 'scheduler';

import './style.css';
const root = document.querySelector('#root');
[LowPriority, NormalPriority, UserBlockingPriority, ImmediatePriority].forEach(
	(priority) => {
		const btn = document.createElement('button');
		root?.appendChild(btn);
		btn.innerText = [
			'',
			'ImmediatePriority',
			'UserBlockingPriority',
			'NormalPriority',
			'LowPriority'
		][priority];
		btn.onclick = () => {
			workList.unshift({
				count: 100,
				priority: priority as Priority
			});
			schedule();
		};
	}
);

type Priority =
	| typeof IdlePriority
	| typeof LowPriority
	| typeof NormalPriority
	| typeof UserBlockingPriority
	| typeof ImmediatePriority;

interface Work {
	count: number;
	priority: Priority;
}

const workList: Work[] = [];
let prevPriority: Priority = IdlePriority;
let currentCallback: CallbackNode | null = null;

function insertSpan(content: string) {
	const span = document.createElement('span');
	span.innerText = content;
	span.className = `pri-${content}`;
	doSomeBusyWork(10000000);
	root?.appendChild(span);
}

function doSomeBusyWork(len: number) {
	let result = 0;
	while (len--) {
		result += len;
	}
}

function schedule() {
	const callbackNode = getFirstCallbackNode();
	const currentWork = workList.sort((a, b) => a.priority - b.priority)[0];

	if (!currentWork) {
		currentCallback = null;
		callbackNode && cancelCallback(callbackNode);
		return;
	}

	const { priority: currentPriority } = currentWork;

	if (currentPriority === prevPriority) {
		return;
	}

	callbackNode && cancelCallback(callbackNode);

	currentCallback = scheduleCallback(
		currentPriority,
		perform.bind(null, currentWork)
	);
}

function perform(work: Work, didTimeout: boolean) {
	const needSync = work.priority === ImmediatePriority || didTimeout;

	while ((needSync || !shouldYield()) && work.count) {
		work.count--;
		insertSpan(work.priority + '');
	}

	prevPriority = work.priority;

	if (!work.count) {
		const workIndex = workList.indexOf(work);
		if (workIndex !== -1) {
			workList.splice(workIndex, 1);
		}
		prevPriority = IdlePriority;
	}

	const prevCallback = currentCallback;
	schedule();
	const newCallback = currentCallback;

	if (newCallback && prevCallback === newCallback) {
		return perform.bind(null, work);
	}
}
