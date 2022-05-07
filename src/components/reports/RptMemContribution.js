import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useCSVDownloader } from 'react-papaparse';
import { useLocation } from 'react-router-dom';
import { UserProfile, Members } from '../../connection/appContexts';
import { getPayoutRate, getMember, addReport, setMemberContributions } from '../../connection/sql/organizations';
import { dateToString } from '../functions/share';
import PleaseWait from '../PleaseWait';
import metamaskIcon from '../../assets/images/metamask16.png';
import polygonIcon from '../../assets/images/polygon16.png';

const RptMemContribution = () => {
	const currCycleData = useLocation();
	const { CSVDownloader } = useCSVDownloader();
	const { profile } = useContext(UserProfile);
	const { members } = useContext(Members);

	const [payoutRate, setRates] = useState({});
	const [isLoading, setLoading] = useState(false);

	const [rptPayout, setRptPayout] = useState();

	useEffect(() => {
		setLoading(true);
		getPayoutRate(profile.organization).then((doc) => {
			setRates(doc.data().payoutRate);
			setLoading(false);
		});
		if (currCycleData.state) {
			setRptPayout(currCycleData.state.data);
		}
	}, []);

	function genPayout(members, contributions, rates) {
		let body = [];

		let count = 1;
		members
			.filter((item) => item.approved)
			.forEach((mem) => {
				let row = {
					no: count,
					uid: mem.uid,
					discord: mem.discord,
					wallettype: mem.wallettype,
					walletaddress: mem.walletid,
					level: mem.level,
					rate: rates[mem.level],
					bonus: 0,
					devpoint: 0,
				};
				contributions.forEach((rptRow) => {
					row.devpoint += rptRow.discord === mem.discord ? rptRow.total : 0;
				});
				row.payout = (row.devpoint / 1000) * rates[mem.level];
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
	}

	const exportCSV = (data) => {
		let body = [];
		data.forEach((row) => {
			body.push({
				no: row.no,
				uid: mem.uid,
				discord: row.discord,
				level: row.level,
				wallettype: row.wallettype,
				walletaddress: row.walletaddress,
				rate: row.rate,
				devpoint: row.devpoint,
				bonus: row.bonus,
				payout: row.payout,
			});
		});
		return body;
	};

	const saveTmpRpt = () => {
		if (members && rptPayout && payoutRate) {
			setLoading(true);
			let data = genPayout(members, rptPayout, payoutRate);
			// let rptDate = dateToString(new Date());
			let rptDate = dateToString(new Date());
			addReport(profile.organization, rptDate, {
				date: rptDate,
				data: data,
			})
				.then(() => {
					data.forEach((mem) => {
						getMember(mem.uid).then((doc) => {
							let contributions = doc.data().contributions;
							let rptArr = Object.keys(contributions);
							if (rptArr.includes(rptDate)) {
								contributions[rptDate].date = rptDate;
								contributions[rptDate].devpoints = mem.devpoint;
								contributions[rptDate].bonus = mem.bonus;
								contributions[rptDate].rate = mem.rate;
								contributions[rptDate].payout = mem.payout;
								contributions[rptDate].settled = false;
							} else {
								contributions = {
									...contributions,
									[rptDate]: {
										date: rptDate,
										devpoints: mem.devpoint,
										bonus: mem.bonus,
										rate: mem.rate,
										payout: mem.payout,
										settled: false,
									},
								};
							}
							setMemberContributions(mem.uid, contributions);
						});
					});
					setLoading(false);
				})
				.catch((err) => {
					alert(`Oops! Got an error during saving process: ${err}`);
					setLoading(false);
				});
		}
	};

	return (
		<div className='contribution-report'>
			{!rptPayout ? (
				<p className='error-text'>Please generate contribution data from land management first</p>
			) : (
				<>
					{isLoading || !members || !payoutRate ? (
						<PleaseWait type='page-spinner' />
					) : (
						<>
							<div className='d-flex align-items-center justify-content-between'>
								<h3>Temp Report - {dateToString(new Date(), '/')}</h3>
								<div className='report-button'>
									<Button variant='success' size='sm' onClick={saveTmpRpt}>
										Save
									</Button>
									<CSVDownloader
										filename='Payout_Report'
										bom={true}
										config={{ delimeter: ',' }}
										download={true}
										data={() => exportCSV(genPayout(members, rptPayout, payoutRate))}
									>
										<Button variant='outline-secondary' size='sm'>
											Export
										</Button>
									</CSVDownloader>
								</div>
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
											{genPayout(members, rptPayout, payoutRate).map((row, key) => (
												<tr key={key}>
													<td>{row.no}</td>
													<td className='bold'>{row.discord}</td>
													<td className='col-center'>
														<Button
															variant='outline-success'
															className='mem-level bold'
															size='sm'
															disabled
														>
															{row.level}
														</Button>
													</td>
													<td>
														<img
															className='wallet-icon'
															alt='Wallet Type'
															src={
																row.wallettype === 'polygon'
																	? polygonIcon
																	: metamaskIcon
															}
														/>
														{row.walletaddress}
													</td>
													<td>{row.rate}</td>
													<td>
														<i className='fa fa-usd' aria-hidden='true'></i>
														<strong>{row.bonus.toString()}</strong>
													</td>
													<td>{row.devpoint}</td>
													<td>
														{row.payout === 0 ? (
															<>
																<i className='fa fa-usd' aria-hidden='true'></i>
																<strong>{row.payout.toString()}</strong>
															</>
														) : (
															<Button sm='sm' variant='outline-success'>
																<i className='fa fa-usd' aria-hidden='true'></i>
																{row.payout.toString()}
															</Button>
														)}
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</motion.div>
							</AnimatePresence>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default RptMemContribution;
