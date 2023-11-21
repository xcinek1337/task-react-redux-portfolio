import React, { useState } from 'react';

const FormInput = ({ label, type, placeHolder, isValid, value, onChange }) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handleChange = (e) => {
		const inputValue = e.target.value;
		onChange(inputValue);
	};

	const inputClassName = `form__input ${isFocused ? 'form__focused' : ''} ${isValid ? 'form__valid' : ''}`;

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
