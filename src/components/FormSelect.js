import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedCurrencyCodeAction } from './actions/currency';

const FormSelect = () => {
	const dispatch = useDispatch();
	const [selectValue, setSelectValue] = useState('');
	const currencyCodes = useSelector(state => state.currencyCodes);

	const handleSelect = e => {
		const value = e.currentTarget.value;

		setSelectValue(value);
		dispatch(setSelectedCurrencyCodeAction(value));
	};

	return (
		<select className='form__select' value={selectValue} onChange={handleSelect}>
			<option value='' disabled hidden>
				Currency
			</option>
			{currencyCodes.map((code, index) => {
				return (
					<option key={index} value={code}>
						{code}
					</option>
				);
			})}
		</select>
	);
};
export default FormSelect;
