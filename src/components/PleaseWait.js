import React from 'react';
import { Spinner } from 'react-bootstrap';
import dragon from '../assets/images/dragon120.png';

const PleaseWait = ({ type }) => {
	return (
		<div className={type}>
			<img src={dragon} width='100px' height='100px' />
			<div>
				<Spinner animation='border' variant='primary' size={type === 'page-spinner' ? 'lg' : 'sm'} />
				{type === 'page-spinner' && <p>Please wait ...</p>}
			</div>
		</div>
	);
};

export default PleaseWait;
