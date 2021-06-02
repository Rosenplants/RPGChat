import { GOT_THREADS } from './actionTypes';

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GOT_THREADS:
      return action.threads;
    default:
      return state;
  }
};
