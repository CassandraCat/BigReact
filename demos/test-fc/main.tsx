import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactElementType } from 'shared/ReactTypes';

function App() {
	const [num, update] = useState(100);
	return (
		<ul onClick={() => update(50)}>
			{new Array(num).fill(0).map((_, i) => {
				return <Child key={i}>{i}</Child>;
			})}
		</ul>
	);
}

function Child({ children }) {
	const now = performance.now();
	while (performance.now() - now < 4) {
		// Artificial delay
	}
	return <li>{children}</li>;
}

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
	(<App />) as ReactElementType
);
