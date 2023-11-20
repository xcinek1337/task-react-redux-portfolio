import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormSelect from './FormSelect';
import FormInput from './FormInput';

import { validateAmount, validatePurchaseDate, validateOldPrice } from '../utilities/validateInputs';

import { allCurrenciesAPI, providePriceAPI } from '../providers/currencyAPI';
import {
	setCurrencyCodesAction,
	setPurchaseDateAction,
	setAmountAction,
	setOldPriceAction,
	setTodaysPriceAction,
	setSubmitOkAction,
} from './actions/currency';

import '../style/formPanel.scss';
import todaysDay from '../utilities/todaysDay';

const CurrencyFormPanel = () => {
	const dispatch = useDispatch();

	const [error, setError] = useState(false);
	const [isDatePurchaseValid, setIsDatePurchaseValid] = useState(false);
	const [isAmountValid, setIsAmountValid] = useState(false);
	const [isOldPriceIsValid, setIsOldPriceIsValid] = useState(false);

	const selectedCode = useSelector((state) => state.selectedCode);
	const purchaseDate = useSelector((state) => state.purchaseDate);
	const oldPrice = useSelector((state) => state.oldPrice);
	const amount = useSelector((state) => state.amount);

	const todaysDate = todaysDay();

	//   downloading currency codes to select
	useEffect(() => {
		getCurrencyCodesAPI();
	}, []);

	useEffect(() => {
		// listening for data to download price in purchase day and todays price
		if (purchaseDate && selectedCode && oldPrice === '') {
			getRates();
		}

		//setting green border to inputs for correct validation
		setIsDatePurchaseValid(validatePurchaseDate(purchaseDate, todaysDate));
		setIsOldPriceIsValid(validateOldPrice(oldPrice));
		setIsAmountValid(validateAmount(amount));
	}, [selectedCode, purchaseDate, oldPrice, amount]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isDatePurchaseValid && isAmountValid && isOldPriceIsValid && selectedCode) {
			dispatch(setSubmitOkAction(true));
			setError(false);
			//clear data in redux
		} else {
			setError(true);
		}
	};

	return (
		<div className='panel'>
			<div className='panel__wrapper'>
				<form
					onSubmit={handleSubmit}
					className='panel__form form'
					action=''
				>
					{error && <p className='form__error'>make sure to fill every field correct, to get better calculations</p>}
					<FormSelect />
					<FormInput
						action={setPurchaseDateAction}
						type={'text'}
						label={'Purchase Date:'}
						placeHolder={'RRRR-MM-DD'}
						isValid={isDatePurchaseValid}
					/>
					<FormInput
						action={setAmountAction}
						type={'text'}
						label={'Amount of Currency:'}
						isValid={isAmountValid}
					/>
					<FormInput
						action={setOldPriceAction}
						type={'text'}
						label={'Exchange Rate on Purchase Day:'}
						placeHolder={'automatic filling'}
						price={oldPrice ? oldPrice : null}
						isValid={isOldPriceIsValid}
					/>

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
			9876;
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
