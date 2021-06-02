import { SET_TAB } from './actionTypes';

// Reducer
export default (state = '', action) => {
  switch (action.type) {
    case SET_TAB:
      return action.tabName;
    default:
      return state;
  }
};
