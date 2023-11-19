import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormSelect from './FormSelect';
import FormInput from './FormInput';

import { allCurrenciesAPI } from '../providers/currencyAPI';
import {
  setCurrencyCodesAction,
  setPurchaseDateAction,
  setAmountAction,
} from './actions/currency';

import '../style/formPanel.scss';
import todaysDay from '../utilities/todaysDay';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const CurrencyFormPanel = () => {
  const [isDatePurchaseValid, setIsDatePurchaseValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const dispatch = useDispatch();

  const [purchaseDate, setPurchaseDate] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const currencyCodes = useSelector((state) => state.currencyCodes);

  const todaysDate = todaysDay();

  useEffect(() => {
    // fetchData();
  }, []);

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

  const fetchDataAndLog = async (selectedCurrency) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetchActuallyPrice(selectedCurrency);
  };

  const handleChangePurchaseDate = (value) => {
    if (dateRegex.test(value) && value < todaysDate) {
      setIsDatePurchaseValid(true);
      dispatch(setPurchaseDateAction(value));
    } else {
      setIsDatePurchaseValid(false);
    }
  };

  const handleChangeAmount = (value) => {
    if (value > 0) {
      setIsAmountValid(true);
      dispatch(setAmountAction(value));
    } else {
      setIsAmountValid(false);
    }
  };
  return (
    <div className="panel">
      <div className="panel__wrapper">
        <form onSubmit={handleSubmit} className="panel__form form" action="">
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
            type={'number'}
            label={'Amount of Currency:'}
            isValid={isAmountValid}
          />

          <input className="form__submit" type="submit" value={'check'} />
        </form>
      </div>
    </div>
  );
};
export default CurrencyFormPanel;

// const xd ={
// 	<div className='form__input-div'>
// 						<label className='form__label' htmlFor=''>
// 							Purchase Date:
// 						</label>
// 						<input
// 							className={`form__input ${isInputFocused && !isValidDate() ? 'invalid' : ''} ${
// 								isInuputOkey ? 'accept' : ''
// 							}`}
// 							placeholder='YYYY-MM-DD'
// 							type='text'
// 							value={purchaseDate}
// 							onFocus={handleFocus}
// 							onBlur={handleBlur}
// 							onChange={e => setPurchaseDate(e.target.value)}
// 						/>
// 					</div>
// 					<div className='form__input-div'>
// 						<label className='form__label' htmlFor=''>
// 							Amount of Currency:
// 						</label>
// 						<input className='form__input' type='number' />
// 					</div>
// 					<div className='form__input-div'>
// 						<label className='form__label' htmlFor=''>
// 							Exchange Rate on Purchase Day:
// 						</label>
// 						<input className='form__input' placeholder='automatic filling' type='number' />
// 					</div>
// }
