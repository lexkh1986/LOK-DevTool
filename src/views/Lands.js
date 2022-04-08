import { React, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    ButtonGroup, InputGroup, ListGroup,
    Input, Button,
    Row, Col,
} from 'reactstrap';
import LandContribution from '../components/LandContribution';
import Land from '../components/Land';
import myLand from '../data/lands';
import { useNavigate } from 'react-router-dom';

const Lands = () => {
    const [lands, setLands] = useState(myLand);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('landContribution');
    }, []);

    const validateLandID = (elem) => {
        const isNumber = (n) => { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

        if (elem.value.length !== 6 || !isNumber(elem.value)) {
            alert('LandID must be a 6 digits number!');
        } else {
            addLand(elem.value);
            elem.value = '';
        }
    }

    const addLand = (id) => {
        let toDate = new Date();
        let fromDate = new Date();
        let nextDate = new Date()
        fromDate.setDate(toDate.getDate() - 6);
        nextDate.setDate(toDate.getDate() + 6);

        setLands(lands.concat({
            id: parseInt(id),
            currentCycle: { from: fromDate.toISOString().slice(0, 10), to: toDate.toISOString().slice(0, 10) },
            nextCycle: { from: toDate.toISOString().slice(0, 10), to: nextDate.toISOString().slice(0, 10) },
            isFilled: false,
            data: []
        }));
    }

    const deleteLand = (id) => {
        const newLands = lands.filter((land) => land.id !== id);
        setLands(newLands);
    }

    return (
        <div className='lands'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                <h2>Lands Management</h2>
                <ButtonGroup>
                    <Button outline={true} size='sm'>
                        Import
                    </Button>
                    <Button outline={true} size='sm'>
                        Export
                    </Button>
                </ButtonGroup>
            </div>
            <Row>
                <Col md='4'>
                    <InputGroup className='mb-3'>
                        <Button outline={true} color='primary'
                            title='Enter value to the textbox and click this button to register a new LandID'
                            onClick={() => validateLandID(document.getElementById('newLandID'))}>
                            <i className='fa fa-map-marker' aria-hidden='true'></i>Add Land
                        </Button>
                        <Input id='newLandID' minLength='6' maxLength='8' size='15' placeholder='Input new landID'></Input>
                    </InputGroup>
                </Col>
                <Col md='8'>
                    <div className='land-list'>
                        <ListGroup id='landGroup'>
                            {
                                lands.map((land) => <Land key={land.id} land={land} handeDelete={deleteLand} />)
                            }
                        </ListGroup>
                    </div>
                </Col>
            </Row>
            <hr />
            <h2>Lands Contributions</h2>
            <Row>
                <Col md='4'>
                    <ButtonGroup>
                        <Button outline={true} color='primary'
                            onClick={() =>
                                ReactDOM.render(<LandContribution lands={lands} members={localStorage.getItem('members')} />,
                                    document.getElementById('contributions'))
                            }
                            title='Click this button to generate a table of devPoint data'>
                            <i className='fa fa-table' aria-hidden="true"></i>Generate
                        </Button>
                        <Button outline={true} color='primary' id="btnSumDevPoint"
                            onClick={() => {
                                if (!localStorage.getItem('landContribution')) {
                                    alert('Please generate land contribution report first!');
                                } else {
                                    navigate('/dashboard/report');
                                }
                            }}
                            title='Group data by discordIDs'>
                            <i className='fa fa-line-chart' aria-hidden="true"></i>Payout Report
                        </Button>
                        <Button outline={true} color='primary' title='Export data to csv'>
                            <i className='fa fa-files-o' aria-hidden="true"></i>Export CSV
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col id='contributions' md='12'>
                </Col>
            </Row>
        </div>
    );
}

export default Lands;