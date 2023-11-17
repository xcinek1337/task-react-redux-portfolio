import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import CurrencyApp from './CurrencyApp';

import { composeWithDevTools } from 'redux-devtools-extension';



// const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
	return (
		<>
			{/* <Provider store={store}> */}
				<CurrencyApp />
			{/* </Provider> */}
		</>
	);
};

export default App;