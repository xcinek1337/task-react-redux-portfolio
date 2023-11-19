import React, { useState } from "react";

const FormInput = ({ label, type, placeHolder, onChange, isValid, price }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
	setValue(value);
    onChange(value);
  };

  const inputClassName = `form__input ${isFocused ? 'form__focused' : ''} ${
    isValid ? 'form__valid' : ''
  }`;

//   Nie wiem jak umowlizwosc swobodne wpisywanie kuru w input, bo jak juz przesle price to nie mozna edytowac inputa... 
  return (
    <div className={'form__input-div'}>
      <label className={'form__label'} htmlFor={label}>
        {label}
      </label>
      <input
        value={price ? price : value}
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
