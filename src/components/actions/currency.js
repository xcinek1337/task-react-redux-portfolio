export const typesAction = {
	SET_CURR_CODES: 'setCurrCodesToState',
	SET_SELECTED_CURR_CODE: 'setSelectedCurrCodeToState',
	SET_PURCHASE_DATE: 'setPurchaseDateToState',
};

export const setCurrencyCodesAction = codes => {
	return {
		type: typesAction.SET_CURR_CODES,
		payload: {
			codes,
		},
	};
};
export const setSelectedCurrencyCodeAction = code => {
	return {
		type: typesAction.SET_SELECTED_CURR_CODE,
		payload: {
			code,
		},
	};
};
export const setPurchaseDateAction = date => {
	return {
		type: typesAction.SET_PURCHASE_DATE,
		payload: {
			date,
		},
	};
};

