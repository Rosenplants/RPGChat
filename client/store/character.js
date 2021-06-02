/* eslint-disable no-console */
import { GOT_CHARACTER, UPDATED_CHARACTER } from './actionTypes';
import { updatedCharacter } from './actionCreators';

// Thunk Creators
export const updateChar =
  (updatedChar) =>
  async (dispatch, getState, { axios }) => {
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
