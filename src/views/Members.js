import React, { useEffect, useState } from 'react';
import { ButtonGroup, InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import MemberList from '../components/MemberList';

const Members = () => {
	const [members, setMemberList] = useState(undefined);
	const [csvSource, setSource] = useState(undefined);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('members'));
		if (data) {
			setMemberList(data);
		}
	}, []);

	const readCSV = (file) => {
		if (!file) {
			return;
		}

		Papa.parse(file, {
			header: true,
			complete: function (results) {
				const data = MapMembers(results.data);
				data.forEach((mem) => {
					mem.kingdoms = mem.kingdoms.filter((item) => item);
				});
				setMemberList(data);
				localStorage.setItem('members', JSON.stringify(data));
			},
		});
	};

	const MapMembers = (raw) => {
		let list = [];
		let count = 1;
		raw.forEach((item) => {
			let newMem = {
				id: count,
				discord: item.discord,
				email: item.email,
				level: parseInt(item.level),
				wallet: { type: item.wallettype, address: item.walletaddress },
				kingdoms: [],
			};
			Object.keys(item).forEach((key) => {
				if (key.includes('kingdom')) {
					newMem.kingdoms.push(item[key]);
				}
			});
			list.push(newMem);
			count += 1;
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
					<MemberList id='memberGroup' members={members} />
				</Col>
			</Row>
		</motion.div>
	);
};

export default Members;
