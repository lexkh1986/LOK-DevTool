import React, { useState } from 'react';
import {
    ButtonGroup, InputGroup,
    Input, Button,
    Row, Col
} from 'reactstrap';
import MemberList from '../components/MemberList';
import myMembers from '../data/members';

const Members = () => {
    const [members] = useState(myMembers);

    return (
        <div className='members'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                <h2>Members Management</h2>
                <ButtonGroup>
                    <Button outline={true} size='sm'>
                        Export
                    </Button>
                </ButtonGroup>
            </div>
            <Row>
                <Col md='4'>
                    <InputGroup className='mb-3'>
                        <Button outline={true} color='primary'
                            title='Browse to .csv file and then click this button to import list of contributed members'>
                            <i className="fa fa-cloud-upload" aria-hidden="true"></i>Import
                        </Button>
                        <Input id='csvMemberFile' type='file' accept=".csv"></Input>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col md='12'>
                    <MemberList id='memberGroup' members={members} />
                </Col>
            </Row>
        </div>
    );
}

export default Members;