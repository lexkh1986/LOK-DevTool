import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { dateToString } from '../functions/share';
import metamaskIcon from '../../assets/images/metamask24.png';
import polygonIcon from '../../assets/images/polygon16.png';

const ProfileDetails = ({ profile }) => {
	return (
		<>
			<h6 style={{ marginTop: '20px' }}>Your profile details</h6>
			<ListGroup className='profile-details'>
				<ListGroupItem>
					<div>
						<span className='label'>Discord</span>
						<span className='info'>{profile.discord}</span>
					</div>
				</ListGroupItem>
				<ListGroupItem>
					<div>
						<span className='label'>Email</span>
						<span className='info'>{profile.email}</span>
					</div>
				</ListGroupItem>
				<ListGroupItem>
					<div>
						<span className='label'>Wallet</span>
						<div>
							<img
								className='wallet-type'
								alt='Wallet Type'
								src={profile.wallettype === 'polygon' ? polygonIcon : metamaskIcon}
							/>
						</div>
						<span className='info'>{profile.walletid}</span>
					</div>
				</ListGroupItem>
				<ListGroupItem>
					<div>
						<span className='label'>Joined Date</span>
						<span className='info'>{dateToString(profile.joinedDate.toDate())}</span>
					</div>
				</ListGroupItem>
			</ListGroup>
			<div></div>
		</>
	);
};

export default ProfileDetails;
