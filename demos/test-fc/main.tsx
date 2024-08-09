import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactElementType } from 'shared/ReactTypes';

function App() {
	const [num, setNum] = useState(199);
	return <div onClickCapture={() => setNum(num + 1)}>{num}</div>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	(<App />) as ReactElementType
);
