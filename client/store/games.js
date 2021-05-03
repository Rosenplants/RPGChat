import { gotThreads } from './threads';
import { gotCharacter } from './character';
import { gotName } from './gameName';
import { gotScenes } from './scenes';
import history from '../history';

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
      const [res1, res2, res3, res4] = await axios.all([
        axios.get(`/api/games/${groupId}/threads`),
        axios.get(`/api/users/${userId}/games/${groupId}/characters`),
        axios.get(`/api/games/${groupId}`),
        axios.get(`/api/users/${userId}/scenes`),
      ]);
      dispatch(gotThreads(res1.data));
      dispatch(gotCharacter(res2.data));
      dispatch(gotName(res3.data.name));
      dispatch(gotScenes(res4.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createGame = (userId, name) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data: game } = await axios.post('/api/games', { name, userId });
      history.push(`/game/${game.id}/invite`);
    } catch (error) {
      console.error(error);
    }
  };
};

export const assocUser = (identObj, gameId) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const res = await axios.post(`/api/games/${gameId}/users`, identObj);

      if (res.status !== 201) throw new Error('oops');
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
