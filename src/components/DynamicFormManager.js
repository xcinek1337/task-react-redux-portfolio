import React from 'react';
import { useDispatch } from 'react-redux';

const DynamicFormManager = ({ formFields }) => {
	const dispatch = useDispatch();

	const renderFields = formFields.map((field, index) => {
		const action = field.dispatcAction;
		return (
			<div
				className={'form__input-div'}
				key={index}
			>
				{field.input === 'select' ? (
					<field.input
						value={field.value}
						onChange={(e) => dispatch(action(e.target.value))}
						className='form__select'
					>
						<option
							value=''
							disabled
							hidden
						>
							{field.name}
						</option>
						{field.currencyCodes.map((code, index) => {
							return (
								<option
									key={index}
									value={code}
								>
									{code}
								</option>
							);
						})}
					</field.input>
				) : (
					<>
						<label
							className={'form__label'}
							htmlFor={field.name}
						>
							{field.name}
						</label>
						<field.input
							className={'form__input'}
							index={field.name}
							id={field.name}
							type={field.type}
							placeholder={field.placeholder}
							value={field.value}
							onChange={(e) => dispatch(action(e.target.value))}
						/>
					</>
				)}
				{field.error && <p className='form__err-input'>{field.error}</p>}
			</div>
		);
	});
	return <>{renderFields}</>;
};
export default DynamicFormManager;
