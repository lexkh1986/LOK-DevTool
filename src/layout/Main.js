import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../assets/styles/main.css';

const Main = () => {
	return (
		<div>
			<Header />
			<Container fluid={true} role='main'>
				<Row className='gx-0'>
					<Col>
						<Sidebar />
					</Col>
					<Col className='col-md-9 ml-sm-auto col-lg-10 px-4 main-bg'>
						<div className='content'>
							<Outlet />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Main;
