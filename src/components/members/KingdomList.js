import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { v4 } from 'uuid';
import { setMemberKingdoms, getMember } from '../../connection/sql/organizations';
import isInActiveIcon from '../../assets/images/redlight12.png';
import isActiveIcon from '../../assets/images/greenlight12.png';

const KingdomList = ({ memberRef, memberName, list }) => {
	const [kingdoms, setList] = useState(list);

	return (
		<div className='kingdoms' member_ref={memberRef}>
			{kingdoms.map((kingdom) => (
				<Kingdom
					kingdom={kingdom}
					memberRef={memberRef}
					memberName={memberName}
					key={kingdom.uuid ? kingdom.uuid : v4()}
				/>
			))}
		</div>
	);
};

const Kingdom = ({ kingdom, memberRef, memberName }) => {
	const [show, setShow] = useState(false);
	const [uuid] = useState(kingdom.uuid ? kingdom.uuid : v4());

	const [id, setId] = useState(kingdom.id);
	const [name, setName] = useState(kingdom.name);
	const [isActive, setActive] = useState(kingdom.isActive);
	const [currObj, setObj] = useState({
		uuid: uuid,
		id: kingdom.id,
		name: kingdom.name,
		isActive: kingdom.isActive,
	});
	const [isLoading, setLoading] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setName(currObj.name);
		setId(currObj.id);
		setActive(currObj.isActive);
		setShow(true);
	};

	function submitForm() {
		if (!name.trim()) {
			alert('Kingdom name must not be empty!');
			return;
		} else {
			setLoading(true);
			getMember(memberRef)
				.then((doc) => {
					let currKingdoms = doc.data().kingdoms;
					currKingdoms.forEach((item) => {
						if (item.uuid === currObj.uuid || item.name === currObj.name) {
							item.uuid = uuid;
							item.name = name.trim();
							item.id = id.trim();
							item.isActive = isActive;
						}
					});
					setMemberKingdoms(memberRef, currKingdoms)
						.then(() => {
							setObj({
								uuid: uuid,
								id: id,
								name: name,
								isActive: isActive,
							});
							setLoading(false);
						})
						.catch((err) => {
							alert(`Oops! Got an error during update data: ${err}`);
							setLoading(false);
						});
				})
				.catch((err) => {
					alert(`Oops! Got an error getting member info: ${err}`);
					setLoading(false);
				});
			handleClose();
		}
	}

	return (
		<>
			<Button size='sm' variant='outline-info' title={currObj.id ? currObj.id : 'Unknown'} onClick={handleShow}>
				{currObj.name}
				<img className='light-pulp' src={currObj.isActive ? isActiveIcon : isInActiveIcon} />
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{'Kingdom '}
						<strong>
							{currObj.name} - {memberName}
						</strong>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className='kingdom-edit'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							size='sm'
							value={name}
							onChange={(e) => setName(e.target.value)}
							onBlur={(e) => setName(e.target.value)}
						/>
						<Form.Label>ID</Form.Label>
						<Form.Control
							size='sm'
							value={id}
							onChange={(e) => setId(e.target.value.replace(/\D/, ''))}
							onBlur={(e) => setId(e.target.value.replace(/\D/, ''))}
						/>
						<Form.Label>Status</Form.Label>
						<Form.Check checked={isActive} onChange={(e) => setActive(e.target.checked)} />
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='primary' onClick={submitForm} disabled={isLoading}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default KingdomList;
