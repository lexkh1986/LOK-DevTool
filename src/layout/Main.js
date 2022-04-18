import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Lands, Members } from '../connection/appContexts';
import Sidebar from './Sidebar';
import Header from './Header';
import '../assets/styles/main.css';

const Main = () => {
	const [lands, setLands] = useState();
	const [members, setMembers] = useState();

	return (
		<div>
			<Header />
			<Container fluid={true} role='main'>
				<Row className='gx-0'>
					<Col>
						<Sidebar />
					</Col>
					<Col className='col-md-9 ml-sm-auto col-lg-10 px-4 main-bg'>
						<Members.Provider value={{ members, setMembers }}>
							<Lands.Provider value={{ lands, setLands }}>
								<div className='content'>
									<Outlet />
								</div>
							</Lands.Provider>
						</Members.Provider>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Main;
