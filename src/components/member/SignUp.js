import React, { useState } from 'react';
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap';

const SignUp = ({ orgs, email, handleSubmit }) => {
	const [dao, setDao] = useState();
	const [discord, setDiscord] = useState();
	const [username, setUsername] = useState();
	const [walletType, setWalletType] = useState();
	const [walletAddress, setWalletAddress] = useState();
	const [kingdoms, setKingdoms] = useState({ 1: { count: 1, name: '', id: '' } });

	const submit = () => {
		let kingdomsArr = [];
		Object.keys(kingdoms).forEach((key) => {
			kingdomsArr.push({ isActive: true, name: kingdoms[key].name, id: kingdoms[key].id });
		});

		console.log({
			organization: dao,
			identity: username,
			discord: discord,
			email: email,
			level: 1,
			joinedDate: new Date(),
			approved: false,
			wallettype: walletType,
			walletid: walletAddress,
			kingdoms: kingdomsArr,
			contributions: [],
		});
	};

	const addKingdom = () => {
		let currCount = Math.max(...Object.keys(kingdoms)) + 1;
		let newKingdoms = { ...kingdoms, ...{ [currCount]: { count: currCount, name: '', id: '' } } };
		setKingdoms(newKingdoms);
	};

	return (
		<div className='sign-up'>
			<Form>
				<Row>
					<Col md='2'>
						<Form.Group>
							<Form.Label>Select one of our supported DAOs</Form.Label>
							<Form.Select size='sm' defaultValue='' id='ddlDAO' onChange={(e) => setDao(e.target.value)}>
								<option value='' disabled hidden>
									Select DAO
								</option>
								{orgs.map((org, key) => (
									<option key={key} value={org}>
										{org}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</Col>
					<Col md='8'>
						<Row>
							<Col md='6'>
								<Form.Label>Profile information</Form.Label>
								<InputGroup size='sm' className='mb-3'>
									<InputGroup.Text id='lblUsername'>Username</InputGroup.Text>
									<Form.Control
										id='txtUsername'
										aria-describedby='lblUsername'
										placeholder='Enter your username'
										onChange={(e) => setUsername(e.target.value)}
									></Form.Control>
								</InputGroup>
								<InputGroup size='sm' className='mb-3'>
									<InputGroup.Text id='lblDiscord'>Discord</InputGroup.Text>
									<Form.Control
										id='txtDiscord'
										aria-describedby='lblDiscord'
										placeholder='Enter your discord ID'
										onChange={(e) => setDiscord(e.target.value)}
									></Form.Control>
								</InputGroup>
							</Col>
						</Row>
						<Row>
							<Col md='6'>
								<InputGroup size='sm' className='mb-3'>
									<InputGroup.Text id='lblWallet'>Wallet</InputGroup.Text>
									<Form.Select
										id='ddlWalletType'
										defaultValue=''
										aria-describedby='lblWallet'
										onChange={(e) => setWalletType(e.target.value)}
									>
										<option value='' disabled hidden>
											Select type
										</option>
										<option value='metamask'>Metamask</option>
									</Form.Select>
									<Form.Control
										id='txtWallet'
										aria-describedby='lblWallet'
										placeholder='Enter your wallet address'
										onChange={(e) => setWalletAddress(e.target.value)}
									></Form.Control>
								</InputGroup>
							</Col>
						</Row>
						<Row>
							<Col md='6'>
								<Button size='sm' variant='secondary' onClick={addKingdom}>
									+
								</Button>
								<Form.Label>Kingdoms</Form.Label>
								{Object.keys(kingdoms).map((kingdom, key) => (
									<Kingdom
										key={key}
										data={kingdoms[kingdom]}
										handleChange={(data) => {
											let newKingdoms = { ...kingdoms };
											delete newKingdoms[data.count];
											setKingdoms({ ...newKingdoms, ...{ [data.count]: data } });
										}}
									/>
								))}
							</Col>
						</Row>
						<Button size='sm' onClick={submit}>
							Submit
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const Kingdom = ({ data, handleChange }) => {
	const [name, setName] = useState(data.name);
	const [id, setID] = useState(data.id);

	return (
		<InputGroup size='sm' className='mb-1'>
			<InputGroup.Text id={`lblKingdom${data.count}`}>{`Kingdom ${data.count}`}</InputGroup.Text>
			<Form.Control
				id={`lblKingdom${data.count}Name`}
				aria-describedby={`lblKingdom${data.count}`}
				placeholder='Name'
				value={name}
				onChange={(e) => {
					setName(e.target.value);
					handleChange({ count: data.count, name: name, id: id });
				}}
			></Form.Control>
			<Form.Control
				id={`lblKingdom${data.count}ID`}
				aria-describedby={`lblKingdom${data.count}`}
				placeholder='ID'
				value={id}
				onChange={(e) => {
					setID(e.target.value);
					handleChange({ count: data.count, name: name, id: id });
				}}
			></Form.Control>
		</InputGroup>
	);
};

export default SignUp;
