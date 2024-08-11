import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactElementType } from 'shared/ReactTypes';

function App() {
	const [num, setNum] = useState(0);
	useEffect(() => {
		console.log('App mount');
	}, []);

	useEffect(() => {
		console.log('num change create', num);
		return () => {
			console.log('num change destroy', num);
		};
	}, [num]);

	return (
		<div onClick={() => setNum(num + 1)}>{num === 0 ? <Child /> : 'noop'}</div>
	);
}

function Child() {
	useEffect(() => {
		console.log('Child mount');
		return () => console.log('Child unmount');
	}, []);

	return 'i am child';
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	(<App />) as ReactElementType
);
