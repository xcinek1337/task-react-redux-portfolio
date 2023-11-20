import React, { useState } from "react";
import { useDispatch } from 'react-redux';

const FormInput = ({ label, type, placeHolder, onChange, isValid, price, action }) => {
	const dipatch = useDispatch();
	const [value, setValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	price && value === '' ? setValue(price) : null;

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handleChange = (e) => {
		const inputValue = e.target.value;
		setValue(inputValue);
		// onChange(inputValue);
    dipatch(action(inputValue))

	};

	const inputClassName = `form__input ${isFocused ? 'form__focused' : ''} ${isValid ? 'form__valid' : ''}`;

	//   Nie wiem jak umowlizwosc swobodne wpisywanie kuru w input, bo jak juz przesle price to nie mozna edytowac inputa...
	return (
		<div className={'form__input-div'}>
			<label
				className={'form__label'}
				htmlFor={label}
			>
				{label}
			</label>
			<input
				value={value}
				className={inputClassName}
				placeholder={placeHolder}
				type={type}
				id={label}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</div>
	);
};
export default FormInput;
