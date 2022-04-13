import React, { useState } from 'react';
import { Form, Stack, Button, ListGroup, Collapse } from 'react-bootstrap';

const Land = ({ land, handeDelete }) => {
    const [lockCurrCycle, toggleLockCycle] = useState(true);
    const [currFromDate, setCurrFromDate] = useState(land.currentCycle.from);
    const [currToDate, setCurrToDate] = useState(land.currentCycle.to);

    const [isNextCycleOpened, toggleNextCycle] = useState(false);
    const [nxtFromDate, setNxtFromDate] = useState(land.nextCycle.from);
    const [nxtToDate, setNxtToDate] = useState(land.nextCycle.to);

    const [isSynced, toggleSync] = useState({ enabled: true, isfilled: false, text: 'GET DATA' });

    const getLandDevPoint = (land) => {
        const strQuery =
            'https://api-lok-live.leagueofkingdoms.com/api/stat/land/contribution?landId=' +
            land.id +
            '&from=' +
            currFromDate +
            '&to=' +
            currToDate;

        toggleSync({ enabled: false, isfilled: isSynced.isfilled, text: 'Loading...' });
        fetch(strQuery)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                storeData(land.id, data.contribution);
                toggleSync({ enabled: true, isfilled: true, text: 'GET DATA' });
            });
    };

    const storeData = (id, data) => {
        const currData = JSON.parse(localStorage.getItem('landData'));
        if (!currData) {
            localStorage.setItem('landData', JSON.stringify([{ id: id, data: data }]));
        } else {
            localStorage.setItem('landData', JSON.stringify(currData.concat({ id: id, data: data })));
        }
    };

    const updateCurrCycle = () => {
        land.currentCycle.from = currFromDate;
        land.currentCycle.to = currToDate;
        toggleLockCycle(!lockCurrCycle);
    };

    return (
        <ListGroup.Item id={land.id}>
            <Stack gap={2}>
                <div className='d-flex align-items-center margin'>
                    <span className='bold'>
                        {land.id}
                        <Button
                            size='sm'
                            className={isSynced.enabled ? '' : 'disabled'}
                            variant={isSynced.isfilled ? 'success' : 'secondary'}
                            isfilled={isSynced.isfilled.toString()}
                            onClick={() => getLandDevPoint(land)}
                        >
                            {isSynced.text}
                        </Button>
                    </span>
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        size='sm'
                        htmlSize={10}
                        id={'from' + land.id}
                        maxLength={10}
                        value={currFromDate}
                        readOnly={lockCurrCycle}
                        onChange={(e) => setCurrFromDate(e.target.value)}
                    />
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        size='sm'
                        htmlSize={10}
                        id={'to' + land.id}
                        maxLength={10}
                        value={currToDate}
                        readOnly={lockCurrCycle}
                        onChange={(e) => setCurrToDate(e.target.value)}
                    />
                    <Button size='sm' variant='secondary' onClick={() => updateCurrCycle()}>
                        <i className={lockCurrCycle ? 'fa fa-unlock' : 'fa fa-floppy-o'} aria-hidden='true' />
                    </Button>
                    <Button
                        size='sm'
                        variant='outline-info'
                        aria-expanded={isNextCycleOpened}
                        aria-controls={'nextCycle_' + land.id}
                        onClick={() => toggleNextCycle(!isNextCycleOpened)}
                    >
                        Schedule
                    </Button>
                    <Button size='sm' variant='outline-danger' onClick={() => handeDelete(land.id)}>
                        X
                    </Button>
                </div>
                <div>
                    <Collapse in={isNextCycleOpened}>
                        <div id={'nextCycle_' + land.id}>
                            <div className='d-flex align-items-center margin'>
                                <span className='bold'>
                                    Next cycle date
                                    <Button size='sm' variant='outline-info'>
                                        +7 Days
                                    </Button>
                                    <Button size='sm' variant='outline-info'>
                                        +14 Days
                                    </Button>
                                </span>
                                <Form.Label>From</Form.Label>
                                <Form.Control size='sm' htmlSize={10} maxLength={10} value={nxtFromDate} readOnly />
                                <Form.Label>To</Form.Label>
                                <Form.Control size='sm' htmlSize={10} maxLength={10} value={nxtToDate} readOnly />
                                <Button size='sm' variant='outline-info'>
                                    Apply as current cycle
                                </Button>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </Stack>
        </ListGroup.Item>
    );
};

export default Land;
