import React from 'react';
import { Spinner } from 'react-bootstrap';

const PleaseWait = () => {
	return (
		<div className='page-spinner'>
			<div>
				<Spinner animation='border' variant='primary' />
				<h6>Please wait ...</h6>
			</div>
		</div>
	);
};

export default PleaseWait;
