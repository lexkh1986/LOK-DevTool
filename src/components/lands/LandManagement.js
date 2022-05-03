import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { AnimatePresence } from 'framer-motion';
import { onSnapshot } from 'firebase/firestore';
import { UserProfile, Lands } from '../../connection/appContexts';
import { getLands, addLand as build, deleteLand as remove } from '../../connection/sql/organizations';
import PleaseWait from '../PleaseWait';
import Land from './Land';

const LandManagement = () => {
	const { profile } = useContext(UserProfile);
	const { lands, setLands } = useContext(Lands);

	const [isloading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		onSnapshot(getLands(profile.organization), (snapshot) => {
			let lands = [];
			snapshot.docs.forEach((doc) => {
				lands.push({ id: doc.id, ...doc.data() });
			});
			setLands(lands);
			setLoading(false);
		});
	}, []);

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

		build(profile.organization, parseInt(id), {
			currentFrom: fromDate.toISOString().slice(0, 10),
			currentTo: toDate.toISOString().slice(0, 10),
			nextFrom: toDate.toISOString().slice(0, 10),
			nextTo: nextDate.toISOString().slice(0, 10),
		});
	};

	const deleteLand = (id) => {
		setLoading(true);
		remove(profile.organization, id).then(() => {
			setLoading(false);
		});
	};

	return (
		<div className='land-management'>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h2>Lands Management</h2>
			</div>
			<Row>
				<Col md='4'>
					<InputGroup className='mb-3'>
						<Button
							variant='outline-primary'
							title='Enter value to the textbox and click this button to register a new LandID'
							onClick={() => validateLandID(document.getElementById('newLandID'))}
						>
							<i className='fa fa-map-marker' aria-hidden='true'></i>Add Land
						</Button>
						<Form.Control
							id='newLandID'
							minLength='6'
							maxLength='8'
							size='15'
							placeholder='Input new landID'
						></Form.Control>
					</InputGroup>
				</Col>
				<Col md='8'>
					<div className='land-list'>
						{isloading ? (
							<PleaseWait type='area-spinner' />
						) : !lands || lands.length === 0 ? (
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
