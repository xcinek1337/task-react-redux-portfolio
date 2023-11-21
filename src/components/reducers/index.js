import { typesAction } from '../actions/currency';
const initialState = {
	investmentInfo: {
		currencyCodes: [],
		selectedCode: '',
		purchaseDate: '',
		amount: '',
		oldPrice: '',
		todaysPrice: '',
		isSubmitValid: '',
	},
	inputsReset: '',
	investments: [],
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case typesAction.SET_CURR_CODES:
			return {
				...state,
				investmentInfo: {
					...state.investmentInfo,
					currencyCodes: action.payload.codes,
				},
			};
		case typesAction.SET_SELECTED_CURR_CODE:
			return {
				...state,
				investmentInfo: {
					...state.investmentInfo,
					selectedCode: action.payload.code,
				},
			};
		case typesAction.SET_PURCHASE_DATE:
			return {
				...state,
				investmentInfo: {
					...state.investmentInfo,
					purchaseDate: action.payload.date,
				},
			};
		case typesAction.SET_AMOUNT:
			return {
				...state,
				investmentInfo: {
					...state.investmentInfo,
					amount: action.payload.amount,
				},
			};
		case typesAction.SET_OLD_PRICE:
			return {
				...state,
				investmentInfo: {
					...state.investmentInfo,
					oldPrice: action.payload.price,
				},
			};
		case typesAction.SET_TODAYS_PRICE:
			return {
				...state,
				investmentInfo: {
					...state.investmentInfo,
					todaysPrice: action.payload.price,
				},
			};
		case typesAction.SET_SUBMIT_OK:
			return {
				...state,
				investmentInfo: {
					...state.investmentInfo,
					isSubmitValid: action.payload.response,
				},
			};
		case typesAction.RESET_INV_INFO:
			return {
				...state,
				investmentInfo: {
					...state.investmentInfo,
					selectedCode: '',
					purchaseDate: '',
					amount: '',
					oldPrice: '',
					todaysPrice: '',
					isSubmitValid: '',
				},
				inputsReset: action.payload.clear,
			};
		case typesAction.SET_INVEST_OBJ:
			return {
				...state,
				investments: [...state.investments, action.payload.obj],
			};
		default:
			return state;
	}
};
export default reducers;
