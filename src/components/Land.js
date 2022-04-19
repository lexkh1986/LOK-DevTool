import React, { useState, useContext } from 'react';
import { Form, Stack, Button, Collapse, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { UserProfile } from '../connection/appContexts';
import { setLand } from '../connection/sql/organizations';
import { addDays, parseDate, dateToString } from './functions/share';
import PleaseWait from './PleaseWait';

const Land = ({ land, handeDelete }) => {
	const { profile } = useContext(UserProfile);

	const [lockCurrCycle, toggleLockCycle] = useState(true);
	const [currFromDate, setCurrFromDate] = useState(land.currentFrom);
	const [currToDate, setCurrToDate] = useState(land.currentTo);

	const [isNextCycleOpened, toggleNextCycle] = useState(false);
	const [nxtFromDate, setNxtFromDate] = useState(land.nextFrom);
	const [nxtToDate, setNxtToDate] = useState(land.nextTo);

	const [isSynced, toggleSync] = useState({ enabled: true, isfilled: false });
	const [isLoading, setLoading] = useState(false);

	const getLandDevPoint = (land) => {
		let combinedPoints = { id: land.id, from: currFromDate, to: currToDate, data: [] };

		// Split date range to 6-days cycles
		let dateRangeArr = parseDateRange(currFromDate, currToDate);

		// Validate unsupport cases
		if (dateRangeArr.length > 5) {
			alert('Too long date range, should less than 5 cycles!');
			return;
		}

		// Get data for all date ranges
		(async (listRange) => {
			toggleSync({ enabled: false, isfilled: false });
			await Promise.all(
				listRange.map(async (range) => {
					const url =
						'https://api-lok-live.leagueofkingdoms.com/api/stat/land/contribution?landId=' +
						land.id +
						'&from=' +
						range.from +
						'&to=' +
						range.to;

					const res = await fetch(url);
					const data = await res.json();
					combinedPoints.data = [...combinedPoints.data, ...data.contribution];
					return;
				})
			);
			toggleSync({ enabled: true, isfilled: true });
			storeData(land.id, combinedPoints.data);
		})(dateRangeArr);
	};

	const parseDateRange = (from, to) => {
		let fromNorm = parseDate(from);
		let toNorm = parseDate(to);

		const cutRange = (from, to) => {
			let rangeArr = [];
			let diff = Math.floor((to - from) / (24 * 3600 * 1000));

			if (Math.floor(diff / 6) <= 1) {
				rangeArr.push({ from: from, to: to });
			} else {
				rangeArr.push({ from: from, to: addDays(from, 6) });
				while (rangeArr[rangeArr.length - 1].to < to) {
					let tmpfr = addDays(rangeArr[rangeArr.length - 1].to, 1);
					rangeArr.push({ from: tmpfr, to: addDays(tmpfr, 6) });
				}
				rangeArr[rangeArr.length - 1].to =
					rangeArr[rangeArr.length - 1].to > to ? to : rangeArr[rangeArr.length - 1].to;
			}
			rangeArr.forEach((item) => {
				item.from = dateToString(item.from);
				item.to = dateToString(item.to);
			});
			return rangeArr;
		};
		return cutRange(fromNorm, toNorm);
	};

	const storeData = (id, data) => {
		const currData = JSON.parse(localStorage.getItem('landData'));
		if (!currData) {
			localStorage.setItem('landData', JSON.stringify([{ id: id, data: data }]));
		} else {
			currData.forEach((element) => {
				if (element.id === id) {
					currData.pop(element);
				}
			});
			localStorage.setItem('landData', JSON.stringify([...currData, ...[{ id: id, data: data }]]));
		}
	};

	const updateCurrCycle = () => {
		setLoading(true);
		setLand(profile.organization, land.id, {
			currentFrom: currFromDate,
			currentTo: currToDate,
		}).then(() => {
			setLoading(false);
		});
		toggleLockCycle(!lockCurrCycle);
	};

	const applyNewCycle = () => {
		setLoading(true);
		setCurrFromDate(nxtFromDate);
		setCurrToDate(nxtToDate);
		setLand(profile.organization, land.id, {
			currentFrom: currFromDate,
			currentTo: currToDate,
		}).then(() => {
			setLoading(false);
		});
	};

	const setNextDate = (days) => {
		setLoading(true);
		let toNorm = parseDate(currToDate);
		let startDate = addDays(toNorm, 1);
		setNxtFromDate(dateToString(startDate));
		setNxtToDate(dateToString(addDays(startDate, parseInt(days))));

		setLand(profile.organization, land.id, {
			nextFrom: dateToString(startDate),
			nextTo: dateToString(addDays(startDate, parseInt(days))),
		}).then(() => {
			setLoading(false);
		});
	};

	return (
		<motion.div
			className='list-group-item'
			id={land.id}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Stack gap={2} style={{ marginTop: '8px' }}>
				<div className='d-flex align-items-center margin'>
					<span className='bold'>
						{land.id}
						<Button
							style={{ width: '80px' }}
							size='sm'
							className={isSynced.enabled ? '' : 'disabled'}
							variant={isSynced.isfilled ? 'success' : 'secondary'}
							isfilled={isSynced.isfilled.toString()}
							onClick={() => getLandDevPoint(land)}
						>
							{!isSynced.enabled ? <Spinner size='sm' animation='border' /> : 'GET DATA'}
						</Button>
					</span>
					{isLoading ? (
						<PleaseWait type='area-spinner' />
					) : (
						<Form>
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
							<Button
								size='sm'
								variant='outline-danger'
								onClick={() => {
									handeDelete(land.id);
								}}
							>
								X
							</Button>
						</Form>
					)}
				</div>
				<div>
					<Collapse in={isNextCycleOpened}>
						<div id={'nextCycle_' + land.id}>
							<div className='d-flex align-items-center margin'>
								<span className='bold'>Next cycle date</span>
								{isLoading ? (
									<PleaseWait type='area-spinner' />
								) : (
									<Form>
										<Button size='sm' variant='outline-info' onClick={() => setNextDate(6)}>
											+6 Days
										</Button>
										<Button size='sm' variant='outline-info' onClick={() => setNextDate(12)}>
											+12 Days
										</Button>
										<Form.Label>From</Form.Label>
										<Form.Control
											size='sm'
											htmlSize={10}
											maxLength={10}
											value={nxtFromDate}
											readOnly
										/>
										<Form.Label>To</Form.Label>
										<Form.Control
											size='sm'
											htmlSize={10}
											maxLength={10}
											value={nxtToDate}
											readOnly
										/>
										<Button size='sm' variant='outline-info' onClick={() => applyNewCycle()}>
											Apply as current cycle
										</Button>
									</Form>
								)}
							</div>
						</div>
					</Collapse>
				</div>
			</Stack>
		</motion.div>
	);
};

export default Land;
