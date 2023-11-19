import todaysDay from '../utilities/todaysDay';

export const allCurrenciesAPI = async (data = todaysDay()) => {
	try {
		const response = await fetch(
			`https://api.apilayer.com/fixer/${data}?symbols=&base=EUR&apikey=B8HfEJcZl5MRlqkzQZ3Vl6v6v039c87h`
		);

		if (!response.ok) {
			// here i create custom error, which i send it to catch block
			throw new Error('Błąd odpowiedzi!');
		}
		const result = await response.json();
		const currencyCodes = Object.keys(result.rates).map(currencyCode => {
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
			`https://api.apilayer.com/fixer/${data}?symbols=PLN&base=${symbol}&apikey=B8HfEJcZl5MRlqkzQZ3Vl6v6v039c87h`
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
	} catch (e) {
		// throwing error e to fetching function
		throw new Error(e);
	}
};
