import React from 'react';

const UnapprovedContent = ({ session }) => {
	return (
		session && (
			<div style={{ textAlign: 'center' }}>
				<h5>Hi {session.displayName}, thank you for signing up!</h5>
				<p>
					Your profile is under reviewing by a DAO admin, this process can take couple hours/days depend on
					the admin.
				</p>
				<h6>Thank you for your patience</h6>
			</div>
		)
	);
};

export default UnapprovedContent;
