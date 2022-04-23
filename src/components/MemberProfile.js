import React, { useContext, useEffect, useState } from 'react';
import { MemberProfile as memProfile, Session } from '../connection/appContexts';
import { Row, Col, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { getMemberByEmail } from '../connection/sql/organizations';
import { dateToString, sortByDate } from '../components/functions/share';
import PleaseWait from './PleaseWait';
import ChartContribution from './charts/ChartContribution';
import ChartPayout from './charts/ChartPayout';
import metamaskIcon from '../assets/images/metamask24.png';
import polygonIcon from '../assets/images/polygon16.png';
import settledIcon from '../assets/images/settled.png';
import castleIcon from '../assets/images/castle48.png';
import isInActive from '../assets/images/redlight12.png';
import isActive from '../assets/images/greenlight12.png';

const MemberProfile = () => {
	const { session } = useContext(Session);
	const { memberProfile, setProfile } = useContext(memProfile);

	const [contributionHistory, setData] = useState([]);
	const [isloading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getMemberByEmail(session.email).then((snapshot) => {
			let prof = snapshot.docs.map((doc) => doc.data())[0];
			let contributionData = sortByDate(prof.contributions, true);

			setProfile(prof);
			setData(contributionData);
			setLoading(false);
		});
	}, []);

	return (
		<div className='profile-content'>
			{isloading ? (
				<PleaseWait type='page-spinner' />
			) : !memberProfile ? (
				<UnauthorizedContent session={session} />
			) : (
				<AuthorizedContent profile={memberProfile} contributions={contributionHistory} />
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

const AuthorizedContent = ({ profile, contributions }) => {
	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h2 className='welcome-text bold'>Welcome! {profile.identity}</h2>
				<div>
					<h1>{profile.organization}</h1>
					<h6 className='mem-level'>Member level {profile.level}</h6>
				</div>
			</div>
			<Row>
				<Col md='4'>
					<ProfileDetails profile={profile} />
					<Kingdoms arrKingdoms={profile.kingdoms} />
				</Col>
				{contributions && contributions.length > 3 && (
					<Col md='8'>
						<div className='chart-area'>
							<ChartPayout chartData={contributions} />
							<ChartContribution chartData={contributions} />
						</div>
					</Col>
				)}
			</Row>
			{contributions && (
				<Row>
					<Col md='8'>
						<div className='contribution-data'>
							<h6>Contribution History</h6>
							<ContributionHistory contributions={contributions} />
						</div>
					</Col>
				</Row>
			)}
		</>
	);
};

const ContributionHistory = ({ contributions }) => {
	return (
		<Table responsive borderless striped>
			<thead>
				<tr>
					<th>Date</th>
					<th>DevPoints</th>
					<th>Rate</th>
					<th>Bonus</th>
					<th>Payout</th>
					<th>Settled</th>
				</tr>
			</thead>
			<tbody>
				{contributions.map((row, key) => (
					<tr key={key}>
						<td>{dateToString(row.date.toDate())}</td>
						<td>{row.devpoints}</td>
						<td>{row.rate}</td>
						<td>
							<i className='fa fa-usd' aria-hidden='true'></i>
							{` ${row.bonus}`}
						</td>
						<td>
							<i className='fa fa-usd' aria-hidden='true'></i>
							{` ${row.payout}`}
						</td>
						<td>{row.settled ? <img width='24' height='24' src={settledIcon} /> : ''}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

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

export default MemberProfile;
