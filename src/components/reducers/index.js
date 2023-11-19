import { typesAction } from '../actions/currency';
const initalState = {
  currencyCodes: [],
  selectedCode: '',
  purchaseDate: '',
  amount: '',
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
    default:
      return state;
  }
};
export default reducers;
