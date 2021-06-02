import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import addDispatch from '../socket/dispatchListeners';
import auth from './auth';
import threads from './threads';
import tabOpen from './tabOpen';
import tabs from './tabs';
import games from './games';
import character from './character';
import messages from './messages';
import gameName from './gameName';
import scenes from './scenes';
import error from './error';
import invites from './invites';

const reducer = combineReducers({
  auth,
  threads,
  tabOpen,
  tabs,
  games,
  character,
  messages,
  gameName,
  scenes,
  error,
  invites,
});

// Creating Our Store
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    createLogger({ collapsed: true })
  )
);

addDispatch(store);

export default store;
