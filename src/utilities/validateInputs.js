import todaysDay from './todaysDay';
const validatePurchaseDate = (date) => {
	const currentDate = todaysDay();
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	return dateRegex.test(date) && date < currentDate ? true : false;
};
const validateAmount = (amount) => {
	return Number(amount) > 0 ? true : false;
};
const validateOldPrice = (price) => {
	return Number(price) > 0 ? true : false;
};
const validateSelect = (select) => {
	return select != '' ? true : false;
};
export const rules = [
	{ name: 'purchaseDate', validate: validatePurchaseDate, message: 'date is required' },
	{ name: 'amount', validate: validateAmount, message: 'amount is required' },
	{ name: 'oldPrice', validate: validateOldPrice, message: 'exchange rate is required' },
	{ name: 'selectedCode', validate: validateSelect, message: 'currency is required' },
];

export const validate = (dataObj, rules) => {
	const errors = {};

	rules.forEach((field) => {
		const value = dataObj[field.name];
		if (!field.validate(value)) {
			errors[field.name] = field.message;
		}
	});
	return errors;
};
