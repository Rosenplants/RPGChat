// Action Types
const GOT_NAME = 'GOT_NAME';

// Action Creator
export const gotName = (name) => ({
  type: GOT_NAME,
  name,
});

// Reducer
export default (state = '', action) => {
  switch (action.type) {
    case GOT_NAME:
      return action.name;
    default:
      return state;
  }
};
