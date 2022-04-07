import React, { useState } from 'react';
import {
    ListGroupItem,
    Button, Input
} from 'reactstrap';

const Land = ({ land, handeDelete }) => {
    const [isLockedCycleState, toggleLockCycle] = useState(true);
    const [currFromDate, setCurrFromDate] = useState(land.currentCycle.from);
    const [currToDate, setCurrToDate] = useState(land.currentCycle.to);
    const [btnGetDataState, toggleLoad] = useState({ enabled: true, isfilled: false, text: 'GET DATA' });

    const getLandDevPoint = (land) => {
        const strQuery = "https://api-lok-live.leagueofkingdoms.com/api/stat/land/contribution?landId=" + land.id
            + "&from=" + currFromDate
            + "&to=" + currToDate;

        toggleLoad({ enabled: false, isfilled: btnGetDataState.isfilled, text: 'Loading...' });
        fetch(strQuery)
            .then(response => {
                return response.json();
            }).then(data => {
                land.data = data.contribution;
                land.isFilled = true;
                toggleLoad({ enabled: true, isfilled: true, text: 'GET DATA' });
                console.log(land);
            })
    };

    const updateCurrCycle = () => {
        land.currentCycle.from = currFromDate;
        land.currentCycle.to = currToDate;
        toggleLockCycle(!isLockedCycleState);
    };

    return (
        <ListGroupItem className='flex-container' id={land.id}>
            <span><strong>{land.id}</strong></span>
            <Button size='sm'
                className={btnGetDataState.enabled ? '' : 'disabled'}
                isfilled={btnGetDataState.isfilled.toString()}
                color={btnGetDataState.isfilled ? 'success' : 'secondary'}
                onClick={() => getLandDevPoint(land)}>{btnGetDataState.text}</Button>
            <label>From</label>
            <Input size='10' id={'from' + land.id} value={currFromDate}
                readOnly={isLockedCycleState} onChange={(e) => setCurrFromDate(e.target.value)} />
            <label>To</label>
            <Input size='10' id={'to' + land.id} value={currToDate}
                readOnly={isLockedCycleState} onChange={(e) => setCurrToDate(e.target.value)} />
            <Button outline size='sm'
                onClick={() => updateCurrCycle()}>
                <i className={isLockedCycleState ? 'fa fa-unlock' : 'fa fa-floppy-o'} aria-hidden="true" />
            </Button>
            <Button outline color='info' size='sm'>Next Cycle</Button>
            <Button outline color='danger' size='sm' onClick={() => handeDelete(land.id)}>X</Button>
        </ListGroupItem>
    );
}

export default Land;