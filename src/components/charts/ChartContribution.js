import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { dateToString } from '../functions/share';
import '../../assets/styles/charts.css';

const ChartContribution = ({ chartData }) => {
	const options = {
		responsive: true,
		layout: {
			padding: {
				top: 20,
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
				text: 'DevPoints History',
			},
		},
		scales: {
			x: {
				ticks: {
					color: 'white',
				},
			},
			y: {
				ticks: {
					padding: 20,
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
				grid: {
					display: false,
				},
			},
		},
	};

	const data = {
		labels: chartData.map((item) => dateToString(item.date.toDate())),
		datasets: [
			{
				label: 'DevPoints History',
				fill: true,
				data: chartData.map((item) => item.devpoints),
			},
		],
	};

	return <Bar className='chart' data={data} options={options} />;
};

export default ChartContribution;
