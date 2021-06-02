/* eslint-disable no-console */
import history from '../history';
import socket from '../socket';
import { setError, setAuth, setLogOut } from './actionCreators';
import { SET_AUTH } from './actionTypes';

const TOKEN = 'token';

// Thunk Creators
export const getUser =
  () =>
  async (dispatch, getState, { axios }) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: user } = await axios.get('/auth/user', {
          headers: {
            authorization: token,
          },
        });

        socket.auth = { username: user.username, userid: user.id };
        socket.connect();
        dispatch(setAuth(user));
        history.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

export const logIn =
  (email, password) =>
  async (dispatch, getState, { axios }) => {
    try {
      const {
        data: { token },
      } = await axios.post('/auth/login', { email, password });
      window.localStorage.setItem(TOKEN, token);
      dispatch(getUser());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };

export const signUp =
  (userInfo) =>
  async (dispatch, getState, { axios }) => {
    try {
      const {
        data: { token },
      } = await axios.post('/auth/signup', userInfo);
      window.localStorage.setItem(TOKEN, token);
      dispatch(getUser());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };

export const logUserOut = () => async (dispatch) => {
  try {
    window.localStorage.removeItem(TOKEN);
    socket.removeAllListeners();
    dispatch(setLogOut());
    history.push('/login');
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
};
