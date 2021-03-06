import React, { useContext, useState } from 'react';
import { ButtonGroup, InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { UserProfile, Members as memList } from '../connection/appContexts';
import { addMember, getAllMembers } from '../connection/sql/organizations';
import Papa from 'papaparse';
import { v4 } from 'uuid';
import MemberList from '../components/members/MemberList';
import ConfirmDialog from '../components/dialogs/ConfirmDialog';

const Members = () => {
	const { profile } = useContext(UserProfile);
	const { members, setMembers } = useContext(memList);
	const [csvSource, setSource] = useState(undefined);

	const readCSV = (file) => {
		if (!file) {
			return;
		}

		Papa.parse(file, {
			header: true,
			complete: function (results) {
				const data = MapMembers(results.data);
				data.forEach((mem) => {
					addMember(mem);
				});
				getAllMembers(profile.organization)
					.then((snapshot) => {
						setMembers(snapshot.docs.map((doc) => Object.assign(doc.data(), { uid: doc.id })));
					})
					.catch((err) => {
						alert(`Oops got an error: ${err}!!!`);
					});
			},
		});
	};

	const MapMembers = (raw) => {
		let list = [];
		raw.forEach((item) => {
			let newMem = {
				approved: false,
				organization: profile.organization,
				discord: item.discord.trim(),
				email: item.email.trim(),
				level: parseInt(item.level),
				joinedDate: new Date(),
				wallettype: item.wallettype.trim().toLowerCase(),
				walletid: item.walletaddress.trim().toLowerCase(),
				kingdoms: [],
				contributions: [],
			};
			Object.keys(item).forEach((key) => {
				if (key.includes('kingdom') && item[key].trim()) {
					newMem.kingdoms.push({
						uuid: v4(),
						id: '',
						isActive: true,
						name: item[key].trim(),
					});
				}
			});
			list.push(newMem);
		});
		// Validate the invalid data
		let currMems = members.map((item) => item.discord);
		list = list.filter((item) => item.discord && !currMems.includes(item.discord));
		return list;
	};

	return (
		<motion.div className='members' initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: '120%' }}>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h2>Members Management</h2>
				<ButtonGroup>
					<Button variant='outline-secondary' size='sm'>
						Export
					</Button>
				</ButtonGroup>
			</div>
			<Row>
				<Col md='4'>
					<InputGroup className='mb-3'>
						<ConfirmDialog
							buttonText={
								<>
									<i className='fa fa-cloud-upload' aria-hidden='true' />
									Import
								</>
							}
							buttonProps={{
								variant: 'outline-primary',
								title: 'Browse to .csv file and then click this button to import list of contributed members',
							}}
							body='You are importing directly a list of new members into your organization. Please confirm your action!'
							activeCondition={() => (csvSource ? true : false)}
							handleSubmit={() => {
								readCSV(csvSource);
								document.getElementById('csvMemberFile').value = null;
								setSource(null);
							}}
						/>
						<Form.Control
							id='csvMemberFile'
							type='file'
							accept='.csv'
							onChange={(e) => {
								setSource(e.target.files[0]);
							}}
						></Form.Control>
					</InputGroup>
				</Col>
			</Row>
			<Row>
				<Col md='12'>
					<MemberList id='memberGroup' />
				</Col>
			</Row>
		</motion.div>
	);
};

export default Members;
