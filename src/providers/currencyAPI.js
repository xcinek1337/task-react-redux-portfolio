export const allCurrenciesAPI = async data => {
	try {
		const response = await fetch(
			`https://api.apilayer.com/fixer/${data}?symbols=&base=EUR&apikey=B8HfEJcZl5MRlqkzQZ3Vl6v6v039c87h`
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error('error', error);
	}
};

export const ProvidePriceAPI = async (data, symbol) => {
	try {
		const response = await fetch(
			`https://api.apilayer.com/fixer/${data}?symbols=PLN&base=${symbol}&apikey=B8HfEJcZl5MRlqkzQZ3Vl6v6v039c87h`
		);
		const result = await response.json();
		const totalPrice = result.rates.PLN;
		if (totalPrice > 1) {
			return totalPrice.toFixed(2);
		} else {
			return totalPrice.toFixed(3);
		}
	} catch (error) {
		console.error('error', error);
	}
};
