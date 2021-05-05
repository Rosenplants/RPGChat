// Action Types
const SET_ERROR = 'SET_ERROR';

// Action Creator
export const setError = (errorMsg) => ({
  type: SET_ERROR,
  errorMsg,
});

// Reducer
export default (_state, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.errorMsg;
    default:
      return '';
  }
};
