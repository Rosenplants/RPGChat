// Action Types
const GOT_CHARACTER = 'GOT_CHARACTER';
const UPDATED_CHARACTER = 'UPDATE_CHARACTER';

// Action Creators
export const gotCharacter = (character) => ({
  type: GOT_CHARACTER,
  character,
});

const updatedCharacter = (character) => ({
  type: UPDATED_CHARACTER,
  character,
});

// Thunk Creators
export const updateChar = (updatedChar) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const res = await axios.put(
        `/api/users/${updatedChar.userId}/characters`,
        updatedChar
      );
      if (res.status === 200) dispatch(updatedCharacter(updatedChar));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case GOT_CHARACTER:
    case UPDATED_CHARACTER:
      return action.character;
    default:
      return state;
  }
};
