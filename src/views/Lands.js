import React from 'react';
import {
    ButtonGroup, InputGroup, ListGroup,
    Input, Button,
    Row, Col,
    Accordion, AccordionItem, AccordionHeader,
    Table
} from 'reactstrap';

const Lands = () => {
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
                        <Button outline={true} color='primary' title='Enter value to the textbox and click this button to register a new LandID'>
                            <i class="fa fa-map-marker" aria-hidden="true"></i>Add Land
                        </Button>
                        <Input id='newLandID' minlength='6' maxlength='8' size='15' placeholder='Input new landID'></Input>
                    </InputGroup>
                </Col>
                <Col md='8'>
                    <ListGroup id='landGroup'></ListGroup>
                </Col>
            </Row>
            <hr />
            <h2>Lands Contributions</h2>
            <Row>
                <Col md='4'>
                    <ButtonGroup>
                        <Button outline={true} color='primary'
                                title='Click this button to generate a table of devPoint data'>
                            <i class="fa fa-table" aria-hidden="true"></i>Generate
                        </Button>
                        <Button outline={true} color='primary' id="btnSumDevPoint" disabled title='Group data by discordIDs'>
                            <i class="fa fa-th" aria-hidden="true"></i>Group
                        </Button>
                        <Button outline={true} color='primary' title='Export data to csv'>
                            <i class="fa fa-files-o" aria-hidden="true"></i>Export CSV
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col md='12'>
                    <Accordion id='accordion' flush>
                        <AccordionItem>
                            <AccordionHeader targetId='1'>Summary By Kingdom</AccordionHeader>
                            <AccordionItem accordionId='1'>
                                <Table id='devPointSum' borderless hover responsive striped size='sm' />
                            </AccordionItem>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader targetId='2'>Summary By Discord</AccordionHeader>
                            <AccordionItem accordionId='2'>
                                <Table id='discordSum' borderless hover responsive striped size='sm' />
                            </AccordionItem>
                        </AccordionItem>
                    </Accordion>
                </Col>
            </Row>
        </div>
    );
}

export default Lands;