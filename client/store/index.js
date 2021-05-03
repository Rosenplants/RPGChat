import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import auth from './auth';
import threads from './threads';
import tabOpen from './tabOpen';
import tabs from './tabs';
import games from './games';
import character from './character';
import messages from './messages';
import gameName from './gameName';

const reducer = combineReducers({
  auth,
  threads,
  tabOpen,
  tabs,
  games,
  character,
  messages,
  gameName,
});

// Creating Our Store
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    createLogger({ collapsed: true })
  )
);

export default store;
