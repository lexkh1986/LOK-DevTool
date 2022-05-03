import React from 'react';
import { Button } from 'react-bootstrap';
import { useCSVDownloader } from 'react-papaparse';

const RptDownloader = ({ name, rptData }) => {
	const { CSVDownloader } = useCSVDownloader();

	const exportCSV = (data) => {
		let body = [];
		console.log(data);
		data.forEach((row) => {
			body.push({
				no: row.no,
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

	return (
		<CSVDownloader
			filename={name}
			bom={true}
			config={{ delimeter: ',' }}
			download={true}
			data={() => exportCSV(rptData)}
		>
			<Button variant='outline-secondary' size='sm'>
				Export
			</Button>
		</CSVDownloader>
	);
};

export default RptDownloader;
