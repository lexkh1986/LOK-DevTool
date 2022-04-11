import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    ButtonGroup, Button,
    Row, Col,
    Table
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const RptLandContribution = () => {
    const navigate = useNavigate();

    return (
        <div className='land-contribution'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                <h2>Lands Contributions</h2>
                <Button outline size='sm'>
                    Export
                </Button>
            </div>
            <Row>
                <Col md='4'>
                    <ButtonGroup>
                        <Button outline color='primary'
                            onClick={() =>
                                ReactDOM.render(<ReportTable
                                    lands={JSON.parse(localStorage.getItem('landData'))}
                                    members={JSON.parse(localStorage.getItem('members'))}
                                />, document.getElementById('contributions'))
                            }
                            title='Click this button to generate a table of devPoint data'>
                            <i className='fa fa-table' aria-hidden="true"></i>Generate
                        </Button>
                        <Button outline color='primary' id="btnSumDevPoint"
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
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col id='contributions' md='12'>
                </Col>
            </Row>
        </div>
    );
};

const ReportTable = ({ lands, members }) => {
    useEffect(() => {
        localStorage.removeItem('landContribution');
    }, []);

    const genHeaders = () => {
        // Build headers
        let headers = ['no', 'discord', 'kingdom', 'total'];
        lands.forEach(land => {
            headers.push(land.id);
        });
        return headers;
    };

    const genBody = () => {
        // Build body
        let body = [];
        let count = 1;
        members.forEach(mem => {
            mem.kingdoms.forEach(kingdom => {
                let row = { no: count, discord: mem.discord, kingdom: kingdom, total: 0 };
                lands.forEach(land => {
                    row[land['id']] = 0;
                });
                body.push(row);
                count += 1;
            });
        });

        // Fill body data
        lands.forEach(land => {
            land.data.forEach(item => {
                body.forEach(row => {
                    if (row.kingdom === item.name) {
                        row[land.id] = parseFloat(item.total.toFixed(2));
                        row.total += row[land.id];
                    }
                });
            });
        });

        localStorage.setItem('landContribution', JSON.stringify(body));
        return body;
    };

    return (
        <div className='contributions-data'>
            {!members ?
                <p className='error-text'>Could not detect any members to calculate. Please check your member management section first!</p> :
                !lands ?
                    <p className='error-text'>Please get data at least 1 land first</p> :
                    <Table size='sm' responsive hover>
                        <thead>
                            <tr>
                                {
                                    genHeaders().map((item, key) =>
                                        <th key={key}>
                                            {isNaN(item) ? null : <i className='fa fa-map' aria-hidden='true'></i>}
                                            {item}
                                        </th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                genBody().map((item, key) =>
                                    <tr key={key}>
                                        {genHeaders().map((col, key) => <td key={key}>{item[col]}</td>)}
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
            }
        </div>
    );
}

export default RptLandContribution;