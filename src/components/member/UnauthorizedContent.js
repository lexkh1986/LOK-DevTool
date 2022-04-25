import React from 'react';
import SignUp from './SignUp';

const UnauthorizedContent = ({ session }) => {
	const DAOdesc = 'https://en.wikipedia.org/wiki/Decentralized_autonomous_organization';

	return (
		session && (
			<>
				<div style={{ textAlign: 'center' }}>
					<h5>
						{`Hi ${session.displayName}, you have not signed up as a `}
						<a href={DAOdesc} target='_blank'>
							DAO
						</a>
						{` member!`}
					</h5>
					<p>
						If you are here to become a member, please complete the registration form below and wait for our
						admins approval to start your journey.
					</p>
				</div>
				<SignUp orgs={['org1', 'org2']} email={session.email} />
			</>
		)
	);
};

export default UnauthorizedContent;
