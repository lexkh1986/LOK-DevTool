import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useCSVDownloader } from 'react-papaparse';
import { motion, AnimatePresence } from 'framer-motion';
import payoutRate from '../connection/payoutRate';
import metamaskIcon from '../assets/images/metamask16.png';
import polygonIcon from '../assets/images/polygon16.png';

const RptMemContribution = () => {
	const { CSVDownloader } = useCSVDownloader();
	const members = localStorage.getItem('members') ? JSON.parse(localStorage.getItem('members')) : null;
	const rptPayout = localStorage.getItem('landContribution')
		? JSON.parse(localStorage.getItem('landContribution'))
		: null;

	const genPayout = () => {
		let body = [];

		let count = 1;
		members.forEach((mem) => {
			let row = {
				no: count,
				discord: mem.discord,
				wallet: mem.wallet,
				level: mem.level,
				rate: payoutRate[mem.level],
				bonus: 0,
				devpoint: 0,
			};
			rptPayout.forEach((rptRow) => {
				row.devpoint += rptRow.discord === mem.discord ? rptRow.total : 0;
			});
			row.payout = (row.devpoint / 1000) * payoutRate[mem.level];
			body.push(row);
			count += 1;
		});

		body.sort((a, b) => -(a.payout - b.payout));
		count = 1;
		body.forEach((item) => {
			// Add bonus program
			if (count === 1) {
				item.bonus = 0;
				item.payout += item.bonus;
			} else if (count === 2) {
				item.bonus = 0;
				item.payout += item.bonus;
			}

			item.no = count;
			count += 1;

			item.devpoint = parseFloat(item.devpoint.toFixed(2));
			item.payout = parseFloat(item.payout.toFixed(2));
		});

		return body;
	};

	const exportCSV = () => {
		const data = [];
		genPayout().forEach((row) => {
			data.push({
				no: row.no,
				discord: row.discord,
				level: row.level,
				wallettype: row.wallet.type,
				walletaddress: row.wallet.address,
				rate: row.rate,
				devpoint: row.devpoint,
				bonus: row.bonus,
				payout: row.payout,
			});
		});
		return data;
	};

	return (
		<div className='contribution-report'>
			{!rptPayout ? (
				<p className='error-text'>Please generate contribution data from land management first</p>
			) : (
				<div>
					<div className='d-flex align-items-center justify-content-between'>
						<h6>Payout</h6>
						<CSVDownloader
							filename='Payout_Report'
							bom={true}
							config={{ delimeter: ',' }}
							download={true}
							data={exportCSV()}
						>
							<Button variant='outline-secondary' size='sm'>
								Export
							</Button>
						</CSVDownloader>
					</div>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ delay: 0.8 }}
						>
							<Table responsive hover size='sm'>
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
									{genPayout().map((row, key) => (
										<tr key={key}>
											<td>{row.no}</td>
											<td>{row.discord}</td>
											<td className='col-center'>
												<Button
													variant='outline-dark'
													className='mem-level bold'
													size='sm'
												>
													{row.level}
												</Button>
											</td>
											<td>
												<img
													className='wallet-icon'
													alt='Wallet Type'
													src={row.wallet.type === 'polygon' ? polygonIcon : metamaskIcon}
												/>
												{row.wallet.address}
											</td>
											<td>{row.rate}</td>
											<td>
												<i className='fa fa-usd' aria-hidden='true'></i>
												<strong>{row.bonus}</strong>
											</td>
											<td>{row.devpoint}</td>
											<td>
												<i className='fa fa-usd' aria-hidden='true'></i>
												<strong>{row.payout}</strong>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</motion.div>
					</AnimatePresence>
				</div>
			)}
		</div>
	);
};

export default RptMemContribution;
