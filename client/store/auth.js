import history from '../history';
import socket from '../socket';

/* eslint-disable no-console */
const TOKEN = 'token';

// Action Types
const SET_AUTH = 'SET_AUTH';

// Action Creators
const setAuth = (auth) => ({ type: SET_AUTH, auth });

const setLogOut = () => ({ type: SET_AUTH, auth: {} });

// Thunk Creators
export const getUser = () => {
  return async (dispatch, getState, { axios }) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: user } = await axios.get('/auth/user', {
          headers: {
            authorization: token,
          },
        });
        dispatch(setAuth(user));
        history.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const logIn = (email, password) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const {
        data: { token },
      } = await axios.post('/auth/login', { email, password });
      window.localStorage.setItem(TOKEN, token);
      dispatch(getUser());
    } catch (error) {
      dispatch(setAuth({ error }));
    }
  };
};

export const signUp = (userInfo) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const {
        data: { token },
      } = await axios.post('/auth/signup', userInfo);
      window.localStorage.setItem(TOKEN, token);
      dispatch(getUser());
    } catch (error) {
      dispatch(setAuth({ error }));
    }
  };
};

export const logUserOut = () => {
  return async (dispatch, getState, { axios }) => {
    try {
      window.localStorage.removeItem(TOKEN);
      // const {data: session} = await axios.get('/auth/guest');
      dispatch(setLogOut());
      history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };
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
