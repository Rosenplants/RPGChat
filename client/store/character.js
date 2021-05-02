// Action Types
const GOT_CHARACTER = 'GOT_CHARACTER';

// Action Creators
export const gotCharacter = (character) => ({
  type: GOT_CHARACTER,
  character,
});

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
