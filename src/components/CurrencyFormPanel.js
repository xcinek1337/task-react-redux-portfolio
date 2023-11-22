import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DynamicFormManager from './DynamicFormManager';


import todaysDay from '../utilities/todaysDay';
import { validate, rules } from '../utilities/validateInputs';
import { allCurrenciesAPI, providePriceAPI } from '../providers/currencyAPI';
import {
	setCurrencyCodesAction,
	setPurchaseDateAction,
	setAmountAction,
	setOldPriceAction,
	setTodaysPriceAction,
	setSelectedCurrencyCodeAction,
	resetInvestmentInfoAction,
	addInvestmentAction,
	setLocalStorageDataAction,
} from '../actions/currency';

import '../style/formPanel.scss';

const CurrencyFormPanel = () => {
	const dispatch = useDispatch();
	const todaysDate = todaysDay();

	const [errors, setErrors] = useState(false);

	const investmentInfo = useSelector((state) => state.investmentInfo);
	const { currencyCodes, selectedCode, purchaseDate, amount, oldPrice, todaysPrice } = investmentInfo;

	//   downloading currency codes to select or getting data about invest from ls
	useEffect(() => {
		// getCurrencyCodesAPI();
		const localStorageData = JSON.parse(localStorage.getItem('investmentsList')) || [];
		dispatch(setLocalStorageDataAction(localStorageData));
	}, []);

	useEffect(() => {
		// listening for data to download price in purchase day and todays price
		if (purchaseDate && selectedCode && oldPrice === '') {
			getRates();
		}
	}, [selectedCode, purchaseDate, oldPrice, amount]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const objData = {
			selectedCode: selectedCode,
			purchaseDate: purchaseDate,
			amount: amount,
			oldPrice: oldPrice,
			todaysPrice: todaysPrice,
		};

		const errors = validate(objData, rules);

		if (Object.keys(errors).length > 0) {
			setErrors(errors);
		} else {
			setErrors('');
			dispatch((dispatch, getState) => {
				dispatch(addInvestmentAction(objData));
				const investments = getState().investments;
				localStorage.setItem('investmentsList', JSON.stringify(investments));
				dispatch(resetInvestmentInfoAction());
			});
		}
	};

	const formFields = [
		{ name: 'Currency:', input: 'select', type: 'text', placeHolder: 'RRRR-MM-DD', dispatcAction: setSelectedCurrencyCodeAction, value: selectedCode, error: errors.selectedCode, currencyCodes: currencyCodes },
		{ name: 'Purchase Date:', input: 'input', type: 'text', placeHolder: 'RRRR-MM-DD', dispatcAction: setPurchaseDateAction, value: purchaseDate, error: errors.purchaseDate },
		{ name: 'Amount of Currency:', input: 'input', type: 'text', placeHolder: 'RRRR-MM-DD', dispatcAction: setAmountAction, value: amount, error: errors.amount },
		{ name: 'Exchange Rate on Purchase Day:', input: 'input', type: 'text', placeHolder: 'RRRR-MM-DD', dispatcAction: setOldPriceAction, value: oldPrice, error: errors.oldPrice },
	  ];

	return (
		<div className='panel'>
			<div className='panel__wrapper'>
				<form
					onSubmit={handleSubmit}
					className='panel__form form'
				>
					{errors && <p className='form__error'>make sure to fill every field correct, to get better calculations</p>}
					<DynamicFormManager formFields={formFields} />
					<input
						className='form__submit'
						type='submit'
						value={'check'}
					/>
				</form>
			</div>
		</div>
	);
	
	//   fetching funcs on the bottom for better clear view code
	async function getCurrencyCodesAPI() {
		try {
			const currency = await allCurrenciesAPI();
			dispatch(setCurrencyCodesAction(currency));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async function getPriceApi(purchaseDate, selectedCurrency) {
		try {
			const result = await providePriceAPI(purchaseDate, selectedCurrency);
			return result;
		} catch (error) {
			console.error('cannot provide old price rate', error);
		}
	}
	async function getRates() {
		const oldPrice = await getPriceApi(purchaseDate, selectedCode);
		if (oldPrice) {
			if (oldPrice > 1) {
				dispatch(setOldPriceAction(oldPrice.toFixed(2)));
			} else {
				dispatch(setOldPriceAction(oldPrice.toFixed(3)));
			}
		}
		const todaysPrice = await getPriceApi(todaysDate, selectedCode);
		if (todaysPrice) {
			if (todaysPrice > 1) {
				dispatch(setTodaysPriceAction(todaysPrice.toFixed(2)));
			} else {
				dispatch(setTodaysPriceAction(todaysPrice.toFixed(3)));
			}
		}
	}
};
export default CurrencyFormPanel;
