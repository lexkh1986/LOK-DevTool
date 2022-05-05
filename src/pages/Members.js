import React, { useContext, useState } from 'react';
import { ButtonGroup, InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { UserProfile, Members as memList } from '../connection/appContexts';
import { addMember, getAllMembers } from '../connection/sql/organizations';
import Papa from 'papaparse';
import MemberList from '../components/MemberList';

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
						id: '',
						isActive: true,
						name: item[key].trim(),
					});
				}
			});
			list.push(newMem);
		});
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
						<Button
							variant='outline-primary'
							onClick={() => {
								readCSV(csvSource);
								document.getElementById('csvMemberFile').value = null;
								setSource(null);
							}}
							title='Browse to .csv file and then click this button to import list of contributed members'
						>
							<i className='fa fa-cloud-upload' aria-hidden='true'></i>Import
						</Button>
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
