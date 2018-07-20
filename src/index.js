import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { IntlProvider, addLocaleData } from 'react-intl';
import createSagaMiddleware from 'redux-saga';

import registerServiceWorker from './registerServiceWorker';

import reducers from './services/reducers';
import sagas from './services/sagas';
import './index.css';
import App from './App';

import en from 'react-intl/locale-data/en';
import enMessages from './locales/en.json';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware, routerMiddleware(history)),
);

const language = (navigator.languages && navigator.languages[0]) || navigator.language;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = {en: enMessages};

addLocaleData([...en]);
sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={language} messages={messages[languageWithoutRegionCode]}>
      <App />
    </IntlProvider>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();