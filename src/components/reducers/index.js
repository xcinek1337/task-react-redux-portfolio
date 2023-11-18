import { typesAction } from '../actions/currency';
const initalState = {
	codes: [],
};

const reducers = (state = initalState, action) => {
	switch (action.type) {
		case typesAction.SET_CURR_CODES:
			return {
				...state,
				codes: action.payload.codes,
			};
		default:
			return state;
	}
};
export default reducers;
