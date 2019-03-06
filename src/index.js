
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { addLocaleData } from 'react-intl';
import createSagaMiddleware from 'redux-saga';

import reducers from './services/reducers';
import genericRed from './services/reducers/generic';
import sagas from './services/sagas';
import './index.css';
import App from './App';

import en from 'react-intl/locale-data/en';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const store = createStore(
    combineReducers({
        ...reducers,
        ...genericRed,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
);

addLocaleData([...en]);
sagaMiddleware.run(sagas);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
