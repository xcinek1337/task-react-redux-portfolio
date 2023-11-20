import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormSelect from './FormSelect';
import FormInput from './FormInput';


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

  const todaysDate = todaysDay();

  //   downloading currency codes to select
  useEffect(() => {
    getCurrencyCodesAPI();
  }, []);

  // listening for data to download price in purchase day and todays price
  useEffect(() => {
		if (purchaseDate && selectedCode && oldPrice === '') {
			getRates();
		}
	}, [selectedCode, purchaseDate, oldPrice]);

	const handleChangePurchaseDate = (value) => {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (dateRegex.test(value) && value < todaysDate) {
			setIsDatePurchaseValid(true);
			dispatch(setPurchaseDateAction(value));
		} else {
			setIsDatePurchaseValid(false);
		}
	};

	const handleChangeAmount = (value) => {
		if (Number(value) > 0) {
			setIsAmountValid(true);
			dispatch(setAmountAction(value));
		} else {
			setIsAmountValid(false);
		}
	};

	//   problem jest taki ze to nie dziala, tzn predzej pobierze kurs samodzielnie, a nawet jesli uzytkownik wpisze kurs, to i tak go podmieni, i onChane nie zadziala...
	//   czyli uzywanie inputa i wstawianie mu value przez props to jest niezbyt dobry pomysl... jesli chcemy dac dowolnosc uztykownikowi, na wpisanie tez swojego kursu kupna..
	const handleChangeOldPrice = (price) => {
		if (Number(price) > 0) {
			setIsOldPriceIsValid(true);
			dispatch(setOldPriceAction(price));
		} else {
			setIsOldPriceIsValid(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// nie wiem jaka lepsza validacje mozna tu wprowadzic...
		if (isDatePurchaseValid && isAmountValid && oldPrice && selectedCode) {
			dispatch(setSubmitOkAction(true));
			setError(false);
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
					{error && <p className='form__error'>make sure to fill every field, to get better calculations</p>}
					<FormSelect />
					<FormInput
						onChange={handleChangePurchaseDate}
						type={'text'}
						label={'Purchase Date:'}
						placeHolder={'RRRR-MM-DD'}
						isValid={isDatePurchaseValid}
					/>
					<FormInput
						onChange={handleChangeAmount}
						type={'text'}
						label={'Amount of Currency:'}
						isValid={isAmountValid}
					/>
					<FormInput
						onChange={handleChangeOldPrice}
						type={'text'}
						label={'Exchange Rate on Purchase Day:'}
						isValid={isOldPriceIsValid}
						placeHolder={'automatic filling'}
						price={oldPrice ? oldPrice : null}
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
