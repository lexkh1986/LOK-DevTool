import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Members } from '../connection/appContexts';
import { dateToString } from '../components/functions/share';
import PleaseWait from './PleaseWait';
import metamaskIcon from '../assets/images/metamask16.png';
import polygonIcon from '../assets/images/polygon16.png';
import isInActive from '../assets/images/redlight12.png';
import isActive from '../assets/images/greenlight12.png';

const MemberList = () => {
	const { members } = useContext(Members);

	return (
		<div className='member-list'>
			{!members ? (
				<PleaseWait type='area-spinner' />
			) : (
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ delay: 0.8 }}
					>
						<Table hover responsive size='sm'>
							<thead>
								<tr>
									<th>User</th>
									<th>Discord</th>
									<th>Joined Date</th>
									<th className='col-center'>Level</th>
									<th>Wallet Address</th>
									<th>Email</th>
									<th>Kingdoms</th>
								</tr>
							</thead>
							<tbody>
								{members.map((member, key) => (
									<Member key={key} member={member} />
								))}
							</tbody>
						</Table>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
};

const Member = ({ member }) => {
	return (
		<tr>
			<td>{member.identity}</td>
			<td>{member.discord}</td>
			<td>{dateToString(member.joinedDate.toDate())}</td>
			<td className='col-center'>
				<Button variant='outline-secondary' className='mem-level bold' size='sm'>
					{member.level}
				</Button>
			</td>
			<td>
				<img
					className='wallet-icon'
					alt='Wallet Type'
					src={member.wallettype === 'polygon' ? polygonIcon : metamaskIcon}
				/>
				{member.walletid}
			</td>
			<td>{member.email}</td>
			<td>
				<Kingdoms memberRef={member.email} list={member.kingdoms} />
			</td>
		</tr>
	);
};

const Kingdoms = ({ memberRef, list }) => {
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

export default MemberList;
