export const typesAction = {
  SET_CURR_CODES: 'setCurrCodesToState',
  SET_SELECTED_CURR_CODE: 'setSelectedCurrCodeToState',
  SET_PURCHASE_DATE: 'setPurchaseDateToState',
  SET_AMOUNT: 'setAmountToState',
  SET_OLD_PRICE: 'setOldPriceToState',
  SET_TODAYS_PRICE: 'setTodaysPriceToState',
  SET_SUBMIT_OK: 'setSubmitOkToState',
};

export const setCurrencyCodesAction = (codes) => {
  return {
    type: typesAction.SET_CURR_CODES,
    payload: {
      codes,
    },
  };
};
export const setSelectedCurrencyCodeAction = (code) => {
  return {
    type: typesAction.SET_SELECTED_CURR_CODE,
    payload: {
      code,
    },
  };
};
export const setPurchaseDateAction = (date) => {
  return {
    type: typesAction.SET_PURCHASE_DATE,
    payload: {
      date,
    },
  };
};

export const setAmountAction = (amount) => {
  return {
    type: typesAction.SET_AMOUNT,
    payload: {
      amount,
    },
  };
};

export const setOldPriceAction = (price) => {
  return {
    type: typesAction.SET_OLD_PRICE,
    payload: {
      price,
    },
  };
};

export const setTodaysPriceAction = (price) => {
  return {
    type: typesAction.SET_TODAYS_PRICE,
    payload: {
      price,
    },
  };
};

export const setSubmitOkAction = (response) => {
  return {
    type: typesAction.SET_SUBMIT_OK,
    payload: {
      response,
    },
  };
};
  