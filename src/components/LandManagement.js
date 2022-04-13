import React, { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Button, ButtonGroup, Input, InputGroup } from 'reactstrap';
import { AnimatePresence } from 'framer-motion';
import Land from '../components/Land';

const LandManagement = () => {
	const [lands, buildLands] = useState(JSON.parse(localStorage.getItem('lands')));

	useEffect(() => {
		localStorage.removeItem('landData');
	}, []);

	useEffect(() => {
		localStorage.setItem('lands', JSON.stringify(lands));
	}, [lands]);

	const validateLandID = (elem) => {
		const isNumber = (n) => {
			return !isNaN(parseFloat(n)) && !isNaN(n - 0);
		};

		if (elem.value.length !== 6 || !isNumber(elem.value)) {
			alert('LandID must be a 6 digits number!');
		} else {
			addLand(elem.value);
			elem.value = '';
		}
	};

	const addLand = (id) => {
		const toDate = new Date();
		const fromDate = new Date();
		const nextDate = new Date();
		fromDate.setDate(toDate.getDate() - 6);
		nextDate.setDate(toDate.getDate() + 6);

		const newLand = {
			id: parseInt(id),
			currentCycle: { from: fromDate.toISOString().slice(0, 10), to: toDate.toISOString().slice(0, 10) },
			nextCycle: { from: toDate.toISOString().slice(0, 10), to: nextDate.toISOString().slice(0, 10) },
			isFilled: false,
			data: [],
		};
		buildLands(!lands ? [newLand] : lands.concat(newLand));
	};

	const deleteLand = (id) => {
		const newLands = lands.filter((land) => land.id !== id);
		buildLands(newLands);
	};

	return (
		<div className='land-management'>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h2>Lands Management</h2>
				<ButtonGroup>
					<Button outline size='sm'>
						Import
					</Button>
					<Button outline size='sm'>
						Export
					</Button>
				</ButtonGroup>
			</div>
			<Row>
				<Col md='4'>
					<InputGroup className='mb-3'>
						<Button
							outline
							color='primary'
							title='Enter value to the textbox and click this button to register a new LandID'
							onClick={() => validateLandID(document.getElementById('newLandID'))}
						>
							<i className='fa fa-map-marker' aria-hidden='true'></i>Add Land
						</Button>
						<Input
							id='newLandID'
							minLength='6'
							maxLength='8'
							size='15'
							placeholder='Input new landID'
						></Input>
					</InputGroup>
				</Col>
				<Col md='8'>
					<div className='land-list'>
						{!lands || lands.length === 0 ? (
							<p>You have no lands, input your first land!</p>
						) : (
							<AnimatePresence>
								<ListGroup id='landGroup'>
									{lands.map((land) => (
										<Land key={land.id} land={land} handeDelete={deleteLand} />
									))}
								</ListGroup>
							</AnimatePresence>
						)}
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default LandManagement;
