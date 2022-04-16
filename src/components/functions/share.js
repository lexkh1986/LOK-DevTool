// Add a number of days to current date object
export const addDays = (date, days) => {
	let result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

// Validate owner
export const valOwn = (cre) => {
	let lst = process.env.REACT_APP_OWNERS.split('|');
	return lst.includes(cre) ? true : false;
};
