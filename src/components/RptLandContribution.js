import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    ButtonGroup, Button,
    Row, Col,
    Table
} from 'reactstrap';
import { useCSVDownloader } from 'react-papaparse';
import { useNavigate } from 'react-router-dom';

const RptLandContribution = () => {
    const [isRptRendered, toggleRender] = useState(false);
    const { CSVDownloader } = useCSVDownloader();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('landContribution');
    }, []);

    const genData = () => {
        const members = JSON.parse(localStorage.getItem('members'));
        const lands = JSON.parse(localStorage.getItem('landData'));

        if (!members) {
            toggleRender(false);
            return <p className='error-text'>Could not detect any members to generate report!</p>;
        }

        if (!lands) {
            toggleRender(false);
            return <p className='error-text'>Please get data at least 1 land!</p>;
        }

        // Build headers
        let headers = ['no', 'discord', 'kingdom', 'total'];
        lands.forEach(land => {
            headers.push(land.id);
        });

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
        toggleRender(true);
        return <ReportTable headers={headers} body={body} />;
    };

    return (
        <div className='land-contribution'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                <h2>Lands Contributions</h2>
                {
                    !isRptRendered ? null :
                        <CSVDownloader
                            filename='LandContribution_Report'
                            bom={true}
                            config={{ delimeter: ',' }}
                            download={true}
                            data={JSON.parse(localStorage.getItem('landContribution'))}
                        >
                            <Button outline size='sm'>Export</Button>
                        </CSVDownloader>
                }
            </div>
            <Row>
                <Col md='4'>
                    <ButtonGroup>
                        <Button outline color='primary'
                            onClick={() => {
                                ReactDOM.render(genData(), document.getElementById('contributions'))
                            }}
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

const ReportTable = ({ headers, body }) => {
    return (
        <div className='contributions-data'>
            <Table size='sm' responsive hover>
                <thead>
                    <tr>
                        {
                            headers.map((item, key) =>
                                <th key={key}>
                                    {isNaN(item) ? null : <i className='fa fa-map' aria-hidden='true'></i>}
                                    {item}
                                </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        body.map((item, key) =>
                            <tr key={key}>
                                {headers.map((col, key) => <td key={key}>{item[col]}</td>)}
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default RptLandContribution;