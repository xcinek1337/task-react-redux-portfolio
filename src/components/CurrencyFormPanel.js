import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormSelect from './FormSelect';
import FormInput from './FormInput';

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
	getLocalStorageDataAction,
} from './actions/currency';

import '../style/formPanel.scss';
import todaysDay from '../utilities/todaysDay';

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
		dispatch(getLocalStorageDataAction(localStorageData));
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

	const onChangePurchaseDate = (value) => {
		dispatch(setPurchaseDateAction(value));
	};
	const onChangeAmount = (value) => {
		dispatch(setAmountAction(value));
	};
	const onChangeOldPrice = (value) => {
		dispatch(setOldPriceAction(value));
	};

	return (
		<div className='panel'>
			<div className='panel__wrapper'>
				<form
					onSubmit={handleSubmit}
					className='panel__form form'
					action=''
				>
					{errors && <p className='form__error'>make sure to fill every field correct, to get better calculations</p>}
					<FormSelect
						error={errors.selectedCode}
						action={setSelectedCurrencyCodeAction}
						options={currencyCodes}
					/>
					<FormInput
						error={errors.purchaseDate}
						type={'text'}
						label={'Purchase Date:'}
						placeHolder={'RRRR-MM-DD'}
						onChange={onChangePurchaseDate}
						value={purchaseDate}
					/>
					<FormInput
						error={errors.amount}
						type={'text'}
						label={'Amount of Currency:'}
						onChange={onChangeAmount}
						value={amount}
					/>
					<FormInput
						error={errors.oldPrice}
						type={'text'}
						label={'Exchange Rate on Purchase Day:'}
						placeHolder={'automatic filling'}
						price={oldPrice ? oldPrice : null}
						value={oldPrice}
						onChange={onChangeOldPrice}
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
