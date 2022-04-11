import React, { useState } from 'react';
import {
    ButtonGroup, InputGroup,
    Input, Button,
    Row, Col
} from 'reactstrap';
import Papa from "papaparse";
import MemberList from '../components/MemberList';

const Members = () => {
    const [members, setMemberList] = useState(undefined);
    const [csvSource, setSource] = useState(undefined);

    const readCSV = (file) => {
        if (!file) { return }

        Papa.parse(file, {
            header: true,
            complete: function (results) {
                const data = MapMembers(results.data);
                setMemberList(data);
                localStorage.setItem('members', JSON.stringify(data));
            }
        });
    };

    const MapMembers = (raw) => {
        let list = [];
        let count = 1;
        raw.forEach(item => {
            let newMem = {
                id: count,
                discord: item.discord,
                email: item.email,
                level: parseInt(item.level),
                wallet: { type: item.wallettype, address: item.walletaddress },
                kingdoms: []
            }
            Object.keys(item).forEach(key => {
                if (key.includes('kingdom')) {
                    newMem.kingdoms.push(item[key]);
                }
            });
            list.push(newMem);
            count += 1;
        });
        return list;
    }

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
                            onClick={() => {
                                readCSV(csvSource);
                            }}
                            title='Browse to .csv file and then click this button to import list of contributed members'>
                            <i className="fa fa-cloud-upload" aria-hidden="true"></i>Import
                        </Button>
                        <Input id='csvMemberFile' type='file' accept=".csv" onChange={(e) => {
                            setSource(e.target.files[0])
                        }}></Input>
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