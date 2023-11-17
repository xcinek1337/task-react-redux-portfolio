import React from 'react';

const API_KEY = '2665e52a5c8d9599141c1e1d812b7492';

const CurrencyApp = () => {
	const fetchApi = () => {
		fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`)
		// fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`)
			.then(resp => resp.json())
			.then(data => console.log(data));
	};

	fetchApi();
	return <div>a</div>;
};
export default CurrencyApp;

