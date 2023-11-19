import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormSelect from './FormSelect';

import { allCurrenciesAPI } from '../providers/currencyAPI';
import { setCurrencyCodesAction, setPurchaseDateAction } from './actions/currency';
import '../style/formPanel.scss';
import todaysDay from '../utilities/todaysDay';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const CurrencyFormPanel = () => {
	const dispatch = useDispatch();
	
	const [purchaseDate, setPurchaseDate] = useState('');
	const [oldPrice, setOldPrice] = useState('');
	const [isInputFocused, setIsInputFocused] = useState(false);
	const currencyCodes = useSelector(state => state.currencyCodes);

	const [isInuputOkey, setIsInputOkey] = useState(false);
	const todaysDate = todaysDay();

	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		if (dateRegex.test(purchaseDate) && purchaseDate < todaysDate) {
			setIsInputOkey(1);
		} else {
			setIsInputOkey(false);
		}
	}, [purchaseDate]);

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

	const isValidDate = () => {
		return dateRegex.test(purchaseDate) && purchaseDate < todaysDate;
	};
	const handleFocus = () => {
		setIsInputFocused(true);
	};

	const handleBlur = () => {
		setIsInputFocused(false);
	};
	return (
		<div className='panel'>
			<div className='panel__wrapper'>
				<form onSubmit={handleSubmit} className='panel__form form' action=''>
					<FormSelect />
					<div className='form__input-div'>
						<label className='form__label' htmlFor=''>
							Purchase Date:
						</label>
						<input
							className={`form__input ${isInputFocused && !isValidDate() ? 'invalid' : ''} ${
								isInuputOkey ? 'accept' : ''
							}`}
							placeholder='YYYY-MM-DD'
							type='text'
							value={purchaseDate}
							onFocus={handleFocus}
							onBlur={handleBlur}
							onChange={e => setPurchaseDate(e.target.value)}
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
};
export default CurrencyFormPanel;
