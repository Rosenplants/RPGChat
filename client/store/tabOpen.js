// Action Types
const SET_TAB = 'SET_TAB';

// Action Creators
export const setTab = (tabName) => ({
  type: SET_TAB,
  tabName,
});

// Reducer
export default (state = '', action) => {
  switch (action.type) {
    case SET_TAB:
      return action.tabName;
    default:
      return state;
  }
};
