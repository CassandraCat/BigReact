import React from 'react';
import ReactDOM from 'react-noop-renderer';

function App() {
	return (
		<>
			<Child />
			<div>hello world</div>
		</>
	);
}

function Child() {
	return 'i am child';
}

const root = ReactDOM.createRoot();

root.render(<App />);

window.root = root;
