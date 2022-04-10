import React from 'react';
import { Table, Button } from 'reactstrap';
import payoutRate from '../data/payoutRate';
import metamaskIcon from '../assets/images/metamask16.png';
import polygonIcon from '../assets/images/polygon16.png';

const ContributionReport = () => {
    const members = localStorage.getItem('members') ? JSON.parse(localStorage.getItem('members')) : null;
    const rptPayout = localStorage.getItem('landContribution') ? JSON.parse(localStorage.getItem('landContribution')) : null;

    const genPayout = () => {
        let body = [];

        let count = 1;
        members.forEach(mem => {
            let row = {
                no: count,
                discord: mem.discord,
                wallet: mem.wallet,
                level: mem.level,
                rate: payoutRate[mem.level],
                bonus: 0,
                devpoint: 0
            };
            rptPayout.forEach(rptRow => {
                row.devpoint += rptRow.discord === mem.discord ? rptRow.total : 0;
            });
            row.payout = (row.devpoint / 1000 * payoutRate[mem.level]);
            body.push(row);
            count += 1;
        });

        body.sort((a, b) => -(a.payout - b.payout));
        count = 1;
        body.forEach(item => {
            // Add bonus program
            if (count === 1) {
                item.bonus = 5;
                item.payout += item.bonus;
            } else if (count === 2) {
                item.bonus = 3;
                item.payout += item.bonus;
            }

            item.no = count;
            count += 1;

            item.devpoint = item.devpoint.toFixed(2);
            item.payout = item.payout.toFixed(2);
        });

        return body;
    };

    return (
        <div className='contribution-report'>
            {
                !rptPayout ? <p className='error-text'>Please generate contribution data from land management first</p> :
                    <div>
                        <h6>Payout</h6>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Discord ID</th>
                                    <th className='col-center'>Level</th>
                                    <th>Wallet Address</th>
                                    <th>Rate</th>
                                    <th>Bonus</th>
                                    <th>DevPoints</th>
                                    <th>Payout</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    genPayout().map((row, key) =>
                                        <tr key={key}>
                                            <td>{row.no}</td>
                                            <td>{row.discord}</td>
                                            <td className='col-center'><Button outline className='mem-level' color='success' size='sm'>{row.level}</Button></td>
                                            <td>
                                                <img className='wallet-icon' alt='Wallet Type' src={row.wallet.type === 'polygon' ? polygonIcon : metamaskIcon} />
                                                {row.wallet.address}
                                            </td>
                                            <td>{row.rate}</td>
                                            <td><i className="fa fa-usd" aria-hidden="true"></i><strong>{row.bonus}</strong></td>
                                            <td>{row.devpoint}</td>
                                            <td><i className="fa fa-usd" aria-hidden="true"></i><strong>{row.payout}</strong></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
            }
        </div>
    );
}

export default ContributionReport;