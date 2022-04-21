import React, { useContext, useEffect, useState } from 'react';
import { MemberProfile as memProfile, Session } from '../connection/appContexts';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getMemberByEmail } from '../connection/sql/organizations';
import { dateToString } from '../components/functions/share';
import PleaseWait from './PleaseWait';
import metamaskIcon from '../assets/images/metamask24.png';
import polygonIcon from '../assets/images/polygon16.png';

const MemberProfile = () => {
	const { session } = useContext(Session);
	const { memberProfile, setProfile } = useContext(memProfile);

	const [isloading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getMemberByEmail(session.email).then((snapshot) => {
			setProfile(snapshot.docs.map((doc) => doc.data())[0]);
			setLoading(false);
			console.log(snapshot.docs.map((doc) => doc.data())[0]);
		});
	}, []);

	return (
		<div className='profile-content'>
			{isloading ? (
				<PleaseWait type='page-spinner' />
			) : !memberProfile ? (
				<UnauthorizedContent session={session} />
			) : (
				<AuthorizedContent profile={memberProfile} />
			)}
		</div>
	);
};

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

const AuthorizedContent = ({ profile }) => {
	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h2 className='welcome-text bold'>Welcome! {profile.identity}</h2>
				<div>
					<h1>{profile.organization}</h1>
					<h6 className='mem-level'>Account level {profile.level}</h6>
				</div>
			</div>
			<Row>
				<Col md='4'>
					<ProfileDetails profile={profile} />
					<Kingdoms profile={profile} />
				</Col>
				<Col md='8'></Col>
			</Row>
			<Row>
				<Col md='12'>
					<>
						<h6>Contribution History</h6>
						<ListGroup className='contribution-history'>
							<ListGroupItem>
								<div>
									<span className='label'>Discord</span>
									<span className='info'>{profile.discord}</span>
								</div>
							</ListGroupItem>
						</ListGroup>
					</>
				</Col>
			</Row>
		</>
	);
};

const Kingdoms = ({ profile }) => {
	return (
		<>
			<h6>Kingdoms</h6>
			<ListGroup className='kingdom-list'>
				<ListGroupItem>
					<div>
						<span className='label'>Discord</span>
						<span className='info'>{profile.discord}</span>
					</div>
				</ListGroupItem>
			</ListGroup>
		</>
	);
};

const ProfileDetails = ({ profile }) => {
	return (
		<>
			<h6>Your profile details</h6>
			<ListGroup className='member-info'>
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

export default MemberProfile;
