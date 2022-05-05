import React, { useContext, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Members } from '../connection/appContexts';
import { dateToString } from '../components/functions/share';
import { toggleMemberStatus, setMemberInfo, getMember, deleteMember } from '../connection/sql/organizations';
import PleaseWait from './PleaseWait';
import metamaskIcon from '../assets/images/metamask16.png';
import polygonIcon from '../assets/images/polygon16.png';
import isInActive from '../assets/images/redlight12.png';
import isActive from '../assets/images/greenlight12.png';

const MemberList = () => {
	const { members, setMembers } = useContext(Members);

	const removeMember = (uid) => {
		deleteMember(uid)
			.then(() => {
				setMembers(members.filter((item) => item.uid != uid));
			})
			.catch((err) => {
				alert(`Oops! Got an error: ${err}`);
			});
	};

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
									<th></th>
									<th>Discord</th>
									<th>Joined Date</th>
									<th>Level</th>
									<th>Wallet Address</th>
									<th>Email</th>
									<th>Kingdoms</th>
								</tr>
							</thead>
							<tbody>
								{members.map((member, key) => (
									<Member key={key} member={member} handleDelete={removeMember} />
								))}
							</tbody>
						</Table>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
};

const Member = ({ member, handleDelete }) => {
	const [isApproved, setApprove] = useState(member.approved);
	const [level, setLevel] = useState(member.level);
	const [email, setEmail] = useState(member.email);
	const [wallettype, setWalletType] = useState(member.wallettype);
	const [walletid, setWalletId] = useState(member.walletid);
	const [currInfo, setCurrInfo] = useState({
		email: member.email,
		level: member.level,
		wallettype: member.wallettype,
		walletid: member.walletid,
	});

	const [editMode, setMode] = useState(false);
	const [isLoading, setLoading] = useState(false);

	return (
		<tr>
			<td>
				<Button
					size='sm'
					variant={editMode ? 'outline-info' : 'outline-secondary'}
					className='edit-member'
					onClick={() => {
						if (editMode) {
							setLoading(true);
							setMemberInfo(member.uid, {
								email: email,
								level: parseInt(level),
								wallettype: wallettype,
								walletid: walletid,
							})
								.then(() => {
									setMode(!editMode);
									setCurrInfo({
										email: email,
										level: level,
										wallettype: wallettype,
										walletid: walletid,
									});
									setLoading(false);
								})
								.catch((err) => {
									alert(`Oops! Got an error ${err}`);
									setLoading(false);
								});
						} else {
							setMode(!editMode);
						}
					}}
				>
					<i className={editMode ? 'fa fa-floppy-o' : 'fa fa-unlock'} aria-hidden='true' />
				</Button>
				{editMode ? (
					<div>
						<Button
							size='sm'
							variant='outline-info'
							className='edit-member'
							onClick={() => {
								setLevel(currInfo.level);
								setEmail(currInfo.email);
								setWalletType(currInfo.wallettype);
								setWalletId(currInfo.walletid);
								setMode(false);
							}}
						>
							<i className='fa fa-times' aria-hidden='true'></i>
						</Button>
						<Button
							size='sm'
							variant='outline-danger'
							className='edit-member'
							onClick={() => {
								handleDelete(member.uid);
								setMode(false);
							}}
						>
							<i className='fa fa-chain-broken' aria-hidden='true'></i>
						</Button>
					</div>
				) : null}
			</td>
			<td>
				{member.discord}
				<Form.Check
					disabled={isLoading}
					type='switch'
					checked={isApproved}
					onChange={() => {
						setLoading(true);
						toggleMemberStatus(member.uid, !isApproved)
							.catch((err) => alert(`Oops! Got an error: ${err}`))
							.finally(() => {
								getMember(member.uid).then((res) => {
									setApprove(res.data().approved);
									setLoading(false);
								});
							});
					}}
				/>
			</td>
			<td>{dateToString(member.joinedDate.toDate())}</td>
			<td>
				{editMode ? (
					<Form.Control
						size='sm'
						maxLength={1}
						className='bold'
						style={{ width: '26px' }}
						value={level}
						onChange={(e) => {
							let newStr = e.target.value.replace(/\D/, '');
							if (newStr) {
								setLevel(newStr);
							} else {
								alert('Must not empty!');
							}
						}}
						onBlur={(e) => {
							let newStr = e.target.value.replace(/\D/, '');
							if (newStr) {
								setLevel(newStr);
							} else {
								alert('Must not empty!');
							}
						}}
					/>
				) : (
					<Button size='sm' variant='outline-success' className='bold' disabled>
						{level}
					</Button>
				)}
			</td>
			<td>
				{editMode ? (
					<>
						<Form.Label>
							Type
							<Form.Select
								size='sm'
								value={wallettype}
								style={{ width: '125px' }}
								onChange={(e) => setWalletType(e.target.value)}
								onBlur={(e) => setWalletType(e.target.value)}
							>
								<option value='metamask'>Metamask</option>
								<option value='polygon'>Polygon</option>
							</Form.Select>
						</Form.Label>
						<Form.Label>
							Address
							<Form.Control
								size='sm'
								value={walletid}
								style={{ width: '350px' }}
								onChange={(e) => {
									let newStr = e.target.value.trim();
									if (!newStr || newStr.toLowerCase() === 'n/a') {
										setWalletId('N/A');
										return;
									}
									setWalletId(newStr.toLowerCase());
								}}
								onBlur={(e) => {
									let newStr = e.target.value.trim();
									if (!newStr || newStr.toLowerCase() === 'n/a') {
										setWalletId('N/A');
										return;
									}
								}}
							/>
						</Form.Label>
					</>
				) : (
					<>
						<img
							className='wallet-icon'
							alt='Wallet Type'
							src={wallettype === 'polygon' ? polygonIcon : metamaskIcon}
						/>
						{walletid}
					</>
				)}
			</td>
			<td>
				{editMode ? (
					<Form.Control
						size='sm'
						value={email}
						onChange={(e) => {
							let newStr = e.target.value.trim();
							if (!newStr || newStr.toLowerCase() === 'n/a') {
								setEmail('N/A');
								return;
							}
							setEmail(newStr.toLowerCase());
						}}
						onBlur={(e) => {
							let newStr = e.target.value.trim();
							if (!newStr || newStr.toLowerCase() === 'n/a') {
								setEmail('N/A');
								return;
							}
							setEmail(newStr.toLowerCase());
						}}
					/>
				) : (
					email
				)}
			</td>
			<td>
				<Kingdoms memberRef={email} list={member.kingdoms} />
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
