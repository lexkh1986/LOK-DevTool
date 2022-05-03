import React, { useState } from 'react';
import { ButtonGroup, InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import MemberList from '../components/MemberList';

const Members = () => {
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
					mem.kingdoms = mem.kingdoms.filter((item) => item);
				});
				console.log(data);
			},
		});
	};

	const MapMembers = (raw) => {
		let list = [];
		raw.forEach((item) => {
			let newMem = {
				approved: false,
				discord: item.discord.trim(),
				email: item.email.trim(),
				level: parseInt(item.level),
				wallettype: item.wallettype.trim().toLowerCase(),
				walletid: item.walletaddress.trim().toLowerCase(),
				kingdoms: [],
				contributions: [],
			};
			Object.keys(item).forEach((key) => {
				if (key.includes('kingdom')) {
					newMem.kingdoms.push(item[key].trim());
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
