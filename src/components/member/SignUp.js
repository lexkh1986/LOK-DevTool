import React, { useState } from 'react';
import { Row, Col, InputGroup, Form, Button, Spinner } from 'react-bootstrap';
import { getMemberByEmail, addMember } from '../../connection/sql/organizations';

const SignUp = ({ orgs, email }) => {
	const maxKingdoms = 8;

	const [dao, setDao] = useState();
	const [discord, setDiscord] = useState();
	const [username, setUsername] = useState();
	const [walletType, setWalletType] = useState();
	const [walletAddress, setWalletAddress] = useState();
	const [kingdoms, setKingdoms] = useState({ 1: { count: 1, name: '', id: '' } });

	const [validated, setValidated] = useState(false);
	const [isSubmiting, setSubmitStatus] = useState(false);

	const constructData = () => {
		let kingdomsArr = [];
		Object.keys(kingdoms).forEach((key) => {
			kingdomsArr.push({
				isActive: true,
				name: kingdoms[key].name,
				id: kingdoms[key].id,
			});
		});

		return {
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
		};
	};

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			setSubmitStatus(true);
			let data = constructData();
			getMemberByEmail(email)
				.then((snapshot) => {
					let prof = snapshot.docs.map((doc) => doc.data())[0];
					if (prof) {
						alert(
							'Your email account has already been registered. Please wait for approval to start your journey'
						);
						setSubmitStatus(false);
						return;
					} else {
						addMember(data)
							.then(() => {
								setSubmitStatus(false);
								window.location.reload(false);
							})
							.catch((err) => {
								alert(`Oops got an error: ${err}!!!`);
								setSubmitStatus(false);
							});
					}
				})
				.catch((err) => {
					alert(`Oops got an error: ${err}!!!`);
					setSubmitStatus(false);
				});
		}
		setValidated(true);
	};

	const addKingdom = () => {
		let currCount = Math.max(...Object.keys(kingdoms)) + 1;
		if (currCount <= maxKingdoms) {
			let newKingdoms = { ...kingdoms, ...{ [currCount]: { count: currCount, name: '', id: '' } } };
			setKingdoms(newKingdoms);
		}
	};

	return (
		<div className='sign-up'>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Row>
					<Col md='2'>
						<Form.Group>
							<Form.Label>Select one of our supported DAOs</Form.Label>
							<Form.Select
								size='sm'
								defaultValue=''
								id='ddlDAO'
								onChange={(e) => setDao(e.target.value)}
								required
							>
								<option value='' disabled hidden>
									Select DAO
								</option>
								{orgs.map((org, key) => (
									<option key={key} value={org}>
										{org}
									</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type='invalid'>Have not selected a DAO!</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col md='8'>
						<Row>
							<Col md='8'>
								<Form.Label>Profile information</Form.Label>
								<InputGroup size='sm' className='mb-3'>
									<InputGroup.Text id='lblUsername'>Username</InputGroup.Text>
									<Form.Control
										id='txtUsername'
										aria-describedby='lblUsername'
										placeholder='Enter your username'
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
									<Form.Control.Feedback type='invalid'>
										Please enter a username!
									</Form.Control.Feedback>
								</InputGroup>
								<InputGroup size='sm' className='mb-3'>
									<InputGroup.Text id='lblDiscord'>Discord</InputGroup.Text>
									<Form.Control
										id='txtDiscord'
										aria-describedby='lblDiscord'
										placeholder='Enter your discord ID'
										onChange={(e) => setDiscord(e.target.value)}
										required
									/>
									<Form.Control.Feedback type='invalid'>
										A discord ID is required
									</Form.Control.Feedback>
								</InputGroup>
							</Col>
						</Row>
						<Row>
							<Col md='8'>
								<Form.Label>Payment</Form.Label>
								<InputGroup size='sm' className='mb-3'>
									<InputGroup.Text id='lblWallet'>Wallet</InputGroup.Text>
									<Form.Select
										id='ddlWalletType'
										defaultValue=''
										aria-describedby='lblWallet'
										onChange={(e) => setWalletType(e.target.value)}
										required
									>
										<option value='' disabled hidden>
											Select type
										</option>
										<option value='metamask'>Metamask</option>
									</Form.Select>
									<Form.Control.Feedback type='invalid'>
										Select select at least 1 wallet!
									</Form.Control.Feedback>
									<Form.Control
										id='txtWallet'
										aria-describedby='lblWallet'
										placeholder='Enter your wallet address'
										onChange={(e) => setWalletAddress(e.target.value)}
										required
									/>
									<Form.Control.Feedback type='invalid'>
										Please enter a wallet address!
									</Form.Control.Feedback>
									<Form.Text>
										Please make sure your wallet address is correct. Wrong address results in losing
										payout without any reclaims!
									</Form.Text>
								</InputGroup>
							</Col>
						</Row>
						<Row>
							<Col md='auto'>
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
										handleDelete={(data) => {
											if (Object.keys(kingdoms).length > 1) {
												let newKingdoms = { ...kingdoms };
												delete newKingdoms[data];
												setKingdoms({ ...newKingdoms });
											}
										}}
									/>
								))}
							</Col>
						</Row>
						<Button className={isSubmiting ? 'disabled' : ''} size='sm' type='submit'>
							{isSubmiting ? <Spinner size='sm' animation='border' /> : 'Submit'}
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const Kingdom = ({ data, handleChange, handleDelete }) => {
	const [name, setName] = useState(data.name);
	const [id, setID] = useState(data.id);

	return (
		<div className='d-flex'>
			<Button
				className='remove-kingdom'
				size='sm'
				variant='outline-secondary'
				onClick={() => handleDelete(data.count)}
			>
				X
			</Button>
			<InputGroup size='sm' className='mb-2'>
				<InputGroup.Text id={`lblKingdom${data.count}`}>{`Kingdom ${data.count}`}</InputGroup.Text>
				<Form.Control
					id={`lblKingdom${data.count}Name`}
					className='kingdom-input'
					aria-describedby={`lblKingdom${data.count}`}
					placeholder='Name'
					value={name}
					autoComplete='off'
					onChange={(e) => {
						setName(e.target.value);
						handleChange({ count: data.count, name: name, id: id });
					}}
					required
				/>
				<Form.Control
					id={`lblKingdom${data.count}ID`}
					className='kingdom-input'
					aria-describedby={`lblKingdom${data.count}`}
					placeholder='ID'
					value={id}
					autoComplete='off'
					onChange={(e) => {
						setID(e.target.value.replace(/\D/, ''));
						handleChange({ count: data.count, name: name, id: id });
					}}
				/>
				<Form.Control.Feedback type='invalid'>Please enter kingdom name!</Form.Control.Feedback>
			</InputGroup>
		</div>
	);
};

export default SignUp;
