import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { allCurrenciesAPI } from '../providers/currencyAPI';
import { setCurrencyCodesAction } from './actions/currency';
import '../style/formPanel.scss';
import todaysDay from '../utilities/todaysDay';

const CurrencyFormPanel = () => {
	const dispatch = useDispatch();
	const [selectedCurrency, setSelectedCurrency] = useState('');
	const [purchaseDate, setPurchaseDate] = useState('');
	const [oldPrice, setOldPrice] = useState('');
	const currencyCodes = useSelector(state => state.codes);

	const todaysDate = todaysDay();

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (dateRegex.test(purchaseDate) && purchaseDate < todaysDate) {
			console.log(`hi`);
		}
	}, [selectedCurrency, purchaseDate]);

	const fetchData = async () => {
		try {
			const data = todaysDay();
			const currency = await allCurrenciesAPI();
			dispatch(setCurrencyCodesAction(currency));
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			console.log(`finally`);
		}
	};

	const fetchDataAndLog = async selectedCurrency => {
		try {
			const result = await providePriceAPI(purchaseDate, selectedCurrency);
			if (result > 1) {
				setOldPrice(result.toFixed(2));
			} else {
				setOldPrice(result);
			}
			setOldPrice(result);
		} catch (error) {
			console.error('error', error);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		// fetchActuallyPrice(selectedCurrency);
	};
	return (
		<div className='panel'>
			<div className='panel__wrapper'>
				<form onSubmit={handleSubmit} className='panel__form form' action=''>
					<select className='form__select' value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)}>
						<option value='' disabled hidden>
							Currency
						</option>
						{currencyCodes && currencyCodes.rates
							? Object.keys(currencyCodes.rates).map((currencyCode, index) => (
									<option key={index} value={currencyCode}>
										{currencyCode}
									</option>
							  ))
							: null}
					</select>
					<div className='form__input-div'>
						<label className='form__label' htmlFor=''>
							Purchase Date:
						</label>
						<input
							className='form__input'
							placeholder='YYYY-MM-DD'
							type='text'
							value={purchaseDate}
							onChange={hadleChangePurchaseDate}
						/>
					</div>
					<div className='form__input-div'>
						<label className='form__label' htmlFor=''>
							Amount of Currency:
						</label>
						<input className='form__input' type='number' />
					</div>
					<div className='form__input-div'>
						<label className='form__label' htmlFor=''>
							Exchange Rate on Purchase Day:
						</label>
						<input className='form__input' placeholder='automatic filling' type='number' />
					</div>
					<input className='form__submit' type='submit' value={'check'} />
				</form>
			</div>
		</div>
	);
	function hadleChangePurchaseDate(e) {
		console.log(todaysDay());
		const value = e.target.value;
		setPurchaseDate(value);
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	}
};
export default CurrencyFormPanel;
