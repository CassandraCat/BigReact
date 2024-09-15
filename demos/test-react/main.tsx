import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactElementType } from 'shared/ReactTypes';

function App() {
	const [num, update] = useState(100);
	return (
		<ul
			onClickCapture={() => {
				update((num) => num + 1);
				update((num) => num + 1);
				update((num) => num + 1);
			}}
		>
			{num}
		</ul>
	);
}

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
	(<App />) as ReactElementType
);
