import React from 'react';
import { HashRouter } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';

const App = () => {
	return (
		<div className='App'>
			<HashRouter>
				<AnimatedRoutes />
			</HashRouter>
		</div>
	);
};

export default App;
