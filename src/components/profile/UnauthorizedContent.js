import React from 'react';
import SignUp from './SignUp';
import logo from '../../assets/images/logo_mini.png';

const UnauthorizedContent = ({ session, orgs }) => {
	const DAOdesc = 'https://en.wikipedia.org/wiki/Decentralized_autonomous_organization';

	return (
		session && (
			<>
				<div style={{ textAlign: 'center' }}>
					<h5>{`Hi ${session.displayName}, you have not signed up as a member!`}</h5>
					<p>
						If you are here to become a member, please complete the registration form below and wait for our
						admins approval to start your journey.
					</p>
				</div>
				<SignUp orgs={orgs} email={session.email} />
				<img className='corner-img' src={logo}></img>
			</>
		)
	);
};

export default UnauthorizedContent;
