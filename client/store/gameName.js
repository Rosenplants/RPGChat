import { GOT_NAME } from './actionTypes';

// Reducer
export default (state = '', action) => {
  switch (action.type) {
    case GOT_NAME:
      return action.name;
    default:
      return state;
  }
};
