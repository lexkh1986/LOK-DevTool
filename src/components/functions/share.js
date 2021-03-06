// Add a number of days to current date object
export const addDays = (date, days) => {
	let result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

export const parseDate = (dateString, delimeter) => {
	let delimt = delimeter ? delimeter : '-';
	let strArr = dateString.split(delimt);
	return new Date(Number(strArr[0]), Number(strArr[1]) - 1, Number(strArr[2]));
};

export const dateToString = (date, delimeter) => {
	let delimt = delimeter ? delimeter : '-';
	return date.toLocaleDateString('en-GB').split('/').reverse().join(delimt);
};

export const sortByDate = (array, asc) => {
	return array.sort(function (a, b) {
		var keyA = parseDate(a.date),
			keyB = parseDate(b.date);
		if (keyA < keyB) return asc ? -1 : 1;
		if (keyA > keyB) return asc ? 1 : -1;
		return 0;
	});
};
