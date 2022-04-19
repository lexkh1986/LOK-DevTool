import React from 'react';
import { Spinner } from 'react-bootstrap';

const PleaseWait = ({ type }) => {
	return (
		<div className={type}>
			<div>
				<Spinner animation='border' variant='primary' size={type === 'page-spinner' ? 'lg' : 'sm'} />
				{type === 'page-spinner' && <p>Please wait ...</p>}
			</div>
		</div>
	);
};

export default PleaseWait;
