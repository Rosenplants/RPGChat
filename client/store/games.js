import { gotThreads } from './threads';
import { gotCharacter } from './character';

// Action Types
const GOT_GAMES = 'GOT_GAMES';

// Action Creators
const gotGames = (games) => ({
  type: GOT_GAMES,
  games,
});

// Thunk Creators
export const fetchGames = (userId) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data: games } = await axios.get(`/api/users/${userId}/games`);
      dispatch(gotGames(games));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setFullGroup = (userId, groupId) => {
  return async (dispatch, getState, { axios }) => {
    try {
      // add route to get scenes / anything else later
      const [res1, res2] = await axios.all([
        axios.get(`/api/games/${groupId}/threads`),
        axios.get(`/api/users/${userId}/games/${groupId}/characters`),
      ]);
      dispatch(gotThreads(res1.data));
      dispatch(gotCharacter(res2.data));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GOT_GAMES:
      return action.games;
    default:
      return state;
  }
};
