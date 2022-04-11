import React from 'react';
import { Table } from 'reactstrap';

const RptLandContribution = ({ lands, members }) => {
    const filledLands = lands.filter(land => land.isFilled);

    const genHeaders = () => {
        // Build headers
        let headers = ['no', 'discord', 'kingdom', 'total'];
        filledLands.forEach(land => {
            headers.push(land.id);
        });
        return headers;
    };

    const genBody = () => {
        // Build body
        let body = [];
        let count = 1;
        JSON.parse(members).forEach(mem => {
            mem.kingdoms.forEach(kingdom => {
                let row = { no: count, discord: mem.discord, kingdom: kingdom, total: 0 };
                filledLands.forEach(land => {
                    row[land['id']] = 0;
                });
                body.push(row);
                count += 1;
            });
        });

        // Fill body data
        filledLands.forEach(land => {
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
        <div className='land-contributions'>
            {!members ?
                <p className='error-text'>Could not detect any members to calculate. Please check your member management section first!</p> :
                filledLands.length === 0 ?
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