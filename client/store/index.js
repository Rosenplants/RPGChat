import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import threads from './threads';
import tabOpen from './tabOpen';
import tabs from './tabs';

const reducer = combineReducers({ auth, threads, tabOpen, tabs });

// Creating Our Store
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default store;
