export const typesAction = {
	SET_CURR_CODES: 'setCurrCodesToState',
};
export const setCurrencyCodesAction = codes => {
	return {
		type: typesAction.SET_CURR_CODES,
		payload: {
			codes,
		},
	};
};
