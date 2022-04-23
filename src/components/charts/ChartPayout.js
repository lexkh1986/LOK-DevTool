import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { dateToString } from '../functions/share';
import '../../assets/styles/charts.css';

const ChartPayout = ({ chartData }) => {
	const options = {
		responsive: true,
		layout: {
			padding: {
				left: 100,
				right: 100,
			},
		},
		plugins: {
			legend: {
				labels: {
					color: 'white',
				},
			},
			title: {
				display: true,
				font: {
					size: 14,
					weight: 500,
				},
				align: 'start',
				color: 'white',
				text: 'Payout History',
			},
		},
		scales: {
			x: {
				ticks: {
					color: 'white',
				},
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					padding: 25,
					color: 'white',
					callback: (value) => {
						if (value / 1000000 >= 1) {
							return `${value / 1000000} m`;
						} else if (value / 1000 >= 1) {
							return `${value / 1000} k`;
						} else {
							return value;
						}
					},
				},
			},
		},
	};

	const data = {
		labels: chartData.map((item) => dateToString(item.date.toDate())),
		datasets: [
			{
				label: 'Payout',
				fill: true,
				pointBackgroundColor: 'green',
				data: chartData.map((item) => item.payout),
			},
		],
	};

	return <Line className='chart' data={data} options={options} />;
};

export default ChartPayout;
