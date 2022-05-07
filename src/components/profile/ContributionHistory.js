import React from 'react';
import { Table } from 'react-bootstrap';
import settledIcon from '../../assets/images/settled.png';

const ContributionHistory = ({ contributions }) => {
	return (
		<Table responsive borderless striped>
			<thead>
				<tr>
					<th>Date</th>
					<th>DevPoints</th>
					<th>Rate</th>
					<th>Bonus</th>
					<th>Payout</th>
					<th>Settled</th>
				</tr>
			</thead>
			<tbody>
				{contributions.map((row, key) => (
					<tr key={key}>
						<td>{row.date}</td>
						<td>{row.devpoints}</td>
						<td>{row.rate}</td>
						<td>
							<i className='fa fa-usd' aria-hidden='true'></i>
							{` ${row.bonus}`}
						</td>
						<td>
							<i className='fa fa-usd' aria-hidden='true'></i>
							{` ${row.payout}`}
						</td>
						<td>
							{row.settled ? (
								<img className='settled-icon' width='24' height='24' src={settledIcon} />
							) : (
								''
							)}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default ContributionHistory;
