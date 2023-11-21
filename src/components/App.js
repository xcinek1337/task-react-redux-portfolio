import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import CurrencyApp from './CurrencyApp';

import reducers from '../reducers';
import '../style/background.scss';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
	return (
		<Provider store={store}>
			<div className='overlay'>
				<CurrencyApp />
			</div>
		</Provider>
	);
};

export default App;
