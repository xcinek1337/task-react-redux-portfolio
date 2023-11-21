import todaysDay from '../utilities/todaysDay';
const API_KEY = '7x0hIV0y2sTUP3TSB47o5gXcuwuQaYd9';
export const allCurrenciesAPI = async (data = todaysDay()) => {
	try {
		const response = await fetch(
			`https://api.apilayer.com/fixer/${data}?symbols=&base=EUR&apikey=7x0hIV0y2sTUP3TSB47o5gXcuwuQaYd9`
		);

		if (!response.ok) {
			// here i create custom error, which i send it to catch block
			throw new Error('Błąd odpowiedzi!');
		}
		const result = await response.json();
		const currencyCodes = Object.keys(result.rates).map((currencyCode) => {
			return currencyCode;
		});
		return currencyCodes;
	} catch (e) {
		// throwing error e to fetching function
		throw new Error(e);
	}
};

export const providePriceAPI = async (data, symbol) => {
	try {
		const response = await fetch(
			`https://api.apilayer.com/fixer/${data}?symbols=PLN&base=${symbol}&apikey=7x0hIV0y2sTUP3TSB47o5gXcuwuQaYd9`
		);
		if (!response.ok) {
			// if (response.status === 401) {
			// 	throw new Error('Unauthorized - chceck private key');
			// }

			// here i create custom error, which i send it to catch block
			throw new Error('Błąd odpowiedzi!');
		}
		const result = await response.json();
		const totalPrice = result.rates.PLN;
		return totalPrice;
	} catch (e) {
		// throwing error e to fetching function
		throw new Error(e);
	}
};
