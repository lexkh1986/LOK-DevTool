import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ChartContribution from '../charts/ChartContribution';
import ChartPayout from '../charts/ChartPayout';
import Kingdoms from './Kingdoms';
import ContributionHistory from './ContributionHistory';
import ProfileDetails from './ProfileDetails';

const AuthorizedContent = ({ profile, contributions }) => {
	const sumDevPoints = contributions.map((item) => item.devpoints).reduce((a, b) => a + b, 0);
	const sumPayout = contributions.map((item) => item.payout).reduce((a, b) => a + b, 0);
	const sumSettled = contributions.map((item) => (item.settled ? item.payout : 0)).reduce((a, b) => a + b, 0);

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h2 className='welcome-text bold'>Welcome! {profile.username}</h2>
				<div>
					<h1>{profile.organization}</h1>
					<h6 className='mem-level'>Member level {profile.level}</h6>
				</div>
			</div>
			<Row>
				<Col md='4'>
					<ProfileDetails profile={profile} />
					<Kingdoms arrKingdoms={profile.kingdoms} />
				</Col>
				{contributions && contributions.length > 2 && (
					<Col md='8'>
						<div className='chart-area'>
							<ChartPayout chartData={contributions} />
							<ChartContribution chartData={contributions} />
						</div>
						<div className='total-sum'>
							<div>
								<span className='label'>Total devPoints contributed: </span>
								<span className='info'>{sumDevPoints.toFixed(2)}</span>
							</div>
							<div>
								<span className='label'>Total payout settled: </span>
								<span className='info'>
									<i className='fa fa-usd' aria-hidden='true'></i>
									{` ${sumSettled}`}
								</span>
							</div>
							<div>
								<span className='label'>Total payout remain: </span>
								<span className='info'>
									<i className='fa fa-usd' aria-hidden='true'></i>
									{` ${(sumPayout - sumSettled).toFixed(2)}`}
								</span>
							</div>
							<hr />
							<div>
								<span className='label'>Last cycle devPoints: </span>
								<span className='info'>{contributions[contributions.length - 1].devpoints}</span>
							</div>
							<div>
								<span className='label'>Last cycle estimated payout: </span>
								<span className='info'>
									<i className='fa fa-usd' aria-hidden='true'></i>
									{` ${contributions[contributions.length - 1].payout}`}
								</span>
							</div>
							<div>
								<span className='label'>Last cycle bonus: </span>
								<span className='info'>
									<i className='fa fa-usd' aria-hidden='true'></i>
									{` ${contributions[contributions.length - 1].bonus}`}
								</span>
							</div>
						</div>
					</Col>
				)}
			</Row>
			{contributions && contributions.length > 0 && (
				<Row>
					<Col md='8'>
						<div className='contribution-data'>
							<h6>Contribution History</h6>
							<ContributionHistory contributions={contributions} />
						</div>
					</Col>
				</Row>
			)}
		</>
	);
};

export default AuthorizedContent;
