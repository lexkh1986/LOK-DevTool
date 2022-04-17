import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Routes from './Routes';
import { Session, UserProfile } from './data/appContexts';

const App = () => {
	const [profile, setProfile] = useState(null);
	const [session, setSession] = useState(null);

	return (
		<div className='App'>
			<HashRouter>
				<AnimatePresence>
					<Session.Provider value={{ session, setSession }}>
						<UserProfile.Provider value={{ profile, setProfile }}>
							<Routes />
						</UserProfile.Provider>
					</Session.Provider>
				</AnimatePresence>
			</HashRouter>
		</div>
	);
};

export default App;
