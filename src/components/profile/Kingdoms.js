import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import castleIcon from '../../assets/images/castle48.png';
import isInActive from '../../assets/images/redlight12.png';
import isActive from '../../assets/images/greenlight12.png';

const Kingdoms = ({ arrKingdoms }) => {
	return (
		<div>
			<h6>Kingdoms {'(' + arrKingdoms.length + ')'}</h6>
			<ListGroup className='kingdom-list'>
				{arrKingdoms.map((item, key) => (
					<ListGroupItem key={key}>
						<img src={castleIcon} />
						<span className='info'>{item.name}</span>
						<span className='info'>-</span>
						<span style={!item.id ? { color: 'red' } : {}} className='info'>
							{!item.id ? 'Unknown ID' : item.id}
						</span>
						<img className='light-pulp' src={item.isActive ? isActive : isInActive} />
					</ListGroupItem>
				))}
			</ListGroup>
		</div>
	);
};

export default Kingdoms