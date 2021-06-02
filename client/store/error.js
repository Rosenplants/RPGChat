import { SET_ERROR } from './actionTypes';

// Reducer
export default (_state, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.errorMsg;
    default:
      return '';
  }
};
