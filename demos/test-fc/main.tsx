import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactElementType } from 'shared/ReactTypes';

function App() {
	return (
		<div>
			<h1>Test FC</h1>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	(<App />) as ReactElementType
);
