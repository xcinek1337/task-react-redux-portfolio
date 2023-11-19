import React, { useState } from "react";

const FormInput = ({ label, type, placeHolder, onChange, isValid }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  const inputClassName = `form__input ${isFocused ? "form__focused" : ""} ${
    isValid ? "form__valid" : ""
  }`;

  return (
    <div className={"form__input-div"}>
      <label className={"form__label"} htmlFor={label}>
        {label}
      </label>
      <input
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
