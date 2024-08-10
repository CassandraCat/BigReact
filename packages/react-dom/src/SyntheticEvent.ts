import { Container } from 'hostConfig';
import { Props } from 'shared/ReactTypes';
export const elementPropsKey = '__props';

const validEventTypes = ['click'];

type EventCallbacks = (event: Event) => void;

interface SyntheticEvent extends Event {
	__stopPropagation: boolean;
}

export interface DOMElement extends Element {
	[elementPropsKey]: Props;
}

interface EventPaths {
	capture: EventCallbacks[];
	bubble: EventCallbacks[];
}

export function updateFiberProps(domElement: DOMElement, props: Props): void {
	domElement[elementPropsKey] = props;
}

export function initEventListeners(
	container: Container,
	eventType: string
): void {
	if (!validEventTypes.includes(eventType)) {
		console.warn(`Invalid event type: ${eventType}`);
		return;
	}
	if (__DEV__) {
		console.log(`Initializing event listener for ${eventType}`);
	}

	container.addEventListener(eventType, (event: Event) => {
		dispatchEvent(container, eventType, event);
	});
}

function dispatchEvent(
	container: Container,
	eventType: string,
	nativeEvent: Event
): void {
	const targetElement = nativeEvent.target as DOMElement;

	if (!targetElement) {
		console.warn('No target element found');
		return;
	}

	const { capture, bubble } = collectEventPaths(
		container,
		targetElement,
		eventType
	);

	const syntheticEvent = createSyntheticEvent(nativeEvent);

	triggerEventFlow(capture, syntheticEvent);

	if (!syntheticEvent.__stopPropagation) {
		triggerEventFlow(bubble, syntheticEvent);
	}
}

function triggerEventFlow(
	paths: EventCallbacks[],
	syntheticEvent: SyntheticEvent
): void {
	for (let i = 0; i < paths.length; i++) {
		const callback = paths[i];
		callback.call(null, syntheticEvent);

		if (syntheticEvent.__stopPropagation) {
			break;
		}
	}
}

function createSyntheticEvent(event: Event): SyntheticEvent {
	const syntheticEvent = event as SyntheticEvent;
	syntheticEvent.__stopPropagation = false;
	const originStopPropagation = event.stopPropagation;

	syntheticEvent.stopPropagation = () => {
		syntheticEvent.__stopPropagation = true;
		if (originStopPropagation) {
			originStopPropagation();
		}
	};
	return syntheticEvent;
}

function collectEventPaths(
	container: Container,
	targetElement: DOMElement,
	eventType: string
) {
	const eventPaths: EventPaths = {
		capture: [],
		bubble: []
	};

	while (targetElement && targetElement !== container) {
		const elementProps = targetElement[elementPropsKey];
		if (elementProps) {
			const eventCallbacks = getEventCallbackNameFromEventType(eventType);
			if (eventCallbacks) {
				eventCallbacks.forEach((eventCallback, index) => {
					const eventListener = elementProps[eventCallback];
					if (eventListener) {
						if (index === 0) {
							eventPaths.capture.unshift(eventListener);
						} else {
							eventPaths.bubble.push(eventListener);
						}
					}
				});
			}
		}
		targetElement = targetElement.parentNode as DOMElement;
	}

	return eventPaths;
}

function getEventCallbackNameFromEventType(
	eventType: string
): string[] | undefined {
	return {
		click: ['onClickCapture', 'onClick']
	}[eventType];
}
