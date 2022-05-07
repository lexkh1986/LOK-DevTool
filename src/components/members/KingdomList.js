import React from 'react';
import { Button } from 'react-bootstrap';
import isInActive from '../../assets/images/redlight12.png';
import isActive from '../../assets/images/greenlight12.png';

const KingdomList = ({ memberRef, list }) => {
	return (
		<div className='kingdom' member_ref={memberRef}>
			{list.map((kingdom, key) => (
				<Button variant='outline-info' size='sm' key={key} title={kingdom.id ? kingdom.id : 'Unknown'}>
					{kingdom.name}
					<img className='light-pulp' src={kingdom.isActive ? isActive : isInActive} />
				</Button>
			))}
		</div>
	);
};

export default KingdomList;
