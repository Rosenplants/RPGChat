import { GOT_SCENES } from './actionTypes';

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GOT_SCENES:
      return action.scenes;
    default:
      return state;
  }
};
