import { typesAction } from '../actions/currency';
const initalState = {
  currencyCodes: [],
  selectedCode: '',
  purchaseDate: '',
  amount: '',
  oldPrice: '',
  todaysPrice: '',
  isSubmitValid: '',
};

const reducers = (state = initalState, action) => {
  switch (action.type) {
    case typesAction.SET_CURR_CODES:
      return {
        ...state,
        currencyCodes: action.payload.codes,
      };
    case typesAction.SET_SELECTED_CURR_CODE:
      return {
        ...state,
        selectedCode: action.payload.code,
      };
    case typesAction.SET_PURCHASE_DATE:
      return {
        ...state,
        purchaseDate: action.payload.date,
      };
    case typesAction.SET_AMOUNT:
      return {
        ...state,
        amount: action.payload.amount,
      };
    case typesAction.SET_OLD_PRICE:
      return {
        ...state,
        oldPrice: action.payload.price,
      };
    case typesAction.SET_TODAYS_PRICE:
      return {
        ...state,
        todaysPrice: action.payload.price,
      };
    case typesAction.SET_SUBMIT_OK:
      return {
        ...state,
        isSubmitValid: action.payload.response,
      };
    default:
      return state;
  }
};
export default reducers;
