import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ConfirmDialog = ({ buttonText, buttonProps, title, body, activeCondition, handleSubmit }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button
				{...buttonProps}
				onClick={() => {
					if (activeCondition()) {
						handleShow();
					}
				}}
			>
				{buttonText}
			</Button>

			<Modal show={show} onHide={handleClose}>
				{title ? (
					<Modal.Header closeButton>
						<Modal.Title>{title}</Modal.Title>
					</Modal.Header>
				) : null}
				<Modal.Body>{body}</Modal.Body>
				<Modal.Footer>
					<Button size='sm' variant='secondary' onClick={handleClose}>
						No
					</Button>
					<Button
						size='sm'
						variant='primary'
						onClick={() => {
							handleClose();
							handleSubmit();
						}}
					>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ConfirmDialog;
