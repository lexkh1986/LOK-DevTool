import React from 'react';

const UnapprovedContent = ({ session }) => {
	return (
		session && (
			<div className='intro-message'>
				<h5>Hi {session.displayName}, thank you for signing up!</h5>
				<p>
					Your profile is under approving by a DAO admin, this process can take couple hours depend on the
					admin.
				</p>
				<h6>Thank you for your patience.</h6>
			</div>
		)
	);
};

export default UnapprovedContent;
