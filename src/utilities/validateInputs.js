export const validatePurchaseDate = (date, todaysDate) => {
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	return dateRegex.test(date) && date < todaysDate ? true : false;
};
export const validateAmount = (amount) => {
	return Number(amount) > 0 ? true : false;
};
export const validateOldPrice = (price) => {
	return Number(price) > 0 ? true : false;
};
