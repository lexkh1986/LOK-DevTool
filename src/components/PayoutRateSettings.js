import React, { useContext, useEffect, useState } from 'react';
import { Form, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';
import { UserProfile } from '../connection/appContexts';
import PleaseWait from './PleaseWait';
import { getPayoutRate, setPayoutRates } from '../connection/sql/organizations';

const PayoutRateSettings = () => {
	const { profile } = useContext(UserProfile);

	const [payoutRate, setRates] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getPayoutRate(profile.organization).then((doc) => {
			setRates(doc.data().payoutRate);
			setLoading(false);
		});
	}, []);

	const updateRates = (level, newRate) => {
		let tmpRates = payoutRate;
		tmpRates[level] = parseFloat(newRate);
		setLoading(true);
		setPayoutRates(profile.organization, tmpRates).then(() => {
			setLoading(false);
		});
	};

	return (
		<div>
			<Row>
				<Col md='6'>
					{isLoading || !payoutRate ? (
						<PleaseWait type='area-spinner' />
					) : (
						<>
							<span style={{ color: 'gray', marginBottom: '10px' }}>
								Change the value to update new rate
							</span>
							<h6>Payout Rates</h6>
							<div className='rate-list d-flex align-items-center'>
								<ListGroup>
									{Object.keys(payoutRate).map((level, key) => (
										<PayoutRate
											key={key}
											level={level}
											rate={payoutRate[level]}
											handleUpdate={updateRates}
										/>
									))}
								</ListGroup>
							</div>
						</>
					)}
				</Col>
			</Row>
		</div>
	);
};

const PayoutRate = ({ level, rate, handleUpdate }) => {
	const [currRate] = useState(rate);
	const [newRate, setNewRate] = useState(rate);

	return (
		<ListGroupItem>
			<span className='bold'>Level {level}</span>
			<Form.Control
				value={newRate}
				onChange={(e) => {
					setNewRate(e.target.value);
				}}
			/>
			{newRate === currRate ? null : (
				<>
					<Button size='sm' variant='outline-secondary' onClick={() => handleUpdate(level, newRate)}>
						Save
					</Button>
					<span className='bold'>Old rate: {currRate}</span>
				</>
			)}
		</ListGroupItem>
	);
};

export default PayoutRateSettings;
