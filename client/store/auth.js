/* eslint-disable no-console */
const TOKEN = 'token';

// Action Types
const SET_AUTH = 'SET_AUTH';

// Action Creators
const setAuth = (auth) => ({ type: SET_AUTH, auth });

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
      } = axios.post('/auth/login', { email, password });
      window.localStorage.setItem(TOKEN, token);
      dispatch(getUser());
    } catch (error) {
      return dispatch(setAuth({ error }));
    }
  };
};

export const signUp = (email, password, username) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const {
        data: { token },
      } = axios.post('/auth/signup', { email, password, username });
      window.localStorage.setItem(TOKEN, token);
      dispatch(getUser());
    } catch (error) {
      return dispatch(setAuth({ error }));
    }
  };
};

// Reducer
const testState = {
  id: 1,
  email: 'test@test.com',
  name: 'Testy McTestFace',
};
export default (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
