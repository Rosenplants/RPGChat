import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import threads from './threads';
import tabOpen from './tabOpen';

const reducer = combineReducers({ auth, threads, tabOpen });

// Creating Our Store
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default store;
