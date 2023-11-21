import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FormSelect = ({ action, options }) => {
	const dispatch = useDispatch();
	const inputsReset = useSelector((state) => state.inputsReset);
	const [selectValue, setSelectValue] = useState('');

	
	useEffect(() => {
		setSelectValue('');
	}, [inputsReset]);


	const handleSelect = (e) => {
		const value = e.currentTarget.value;

		setSelectValue(value);
		dispatch(action(value));
	};

	return (
		<select
			className='form__select'
			value={selectValue}
			onChange={handleSelect}
		>
			<option
				value=''
				disabled
				hidden
			>
				Currency
			</option>
			{options.map((code, index) => {
				return (
					<option
						key={index}
						value={code}
					>
						{code}
					</option>
				);
			})}
		</select>
	);
};
export default FormSelect;
