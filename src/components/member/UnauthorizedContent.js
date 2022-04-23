import React from 'react';

const UnauthorizedContent = ({ session }) => {
	return (
		session && (
			<div className='intro-message'>
				<h5>Hi {session.displayName}, you have not signed up as a DAO member</h5>
				<p>
					If you are here from a League of Kingdoms - DAO admin, please contact your admin for signning up
					guideline
				</p>
				<h6>Thank you!</h6>
			</div>
		)
	);
};

export default UnauthorizedContent;
