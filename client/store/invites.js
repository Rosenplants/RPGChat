import { fetchGames } from './games';

// Action Types
const GOT_INVITES = 'GOT_INVITES';
const REMOVE_INVITE = 'REMOVE_INVITE';

// Action Creators
const gotInvites = (invites) => ({
  type: GOT_INVITES,
  invites,
});

const removeInvite = (inviteId) => ({
  type: REMOVE_INVITE,
  inviteId,
});

// Thunk Creators
export const fetchInvites = (userId) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: invites } = await axios.get(`api/users/${userId}/invites`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(gotInvites(invites));
    } catch (error) {
      console.error(error);
    }
  };
};

export const acceptInvite = (inviteId, userId) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const res = await axios.put(`/api/invites/${inviteId}`);
      if (res.status === 204) {
        dispatch(removeInvite(inviteId));
        dispatch(fetchGames(userId));
      } else throw new Error('oops');
    } catch (error) {
      console.error(error);
    }
  };
};

export const rejectInvite = (inviteId) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const res = await axios.delete(`/api/invites/${inviteId}`);
      if (res.status === 204) dispatch(removeInvite(inviteId));
      else throw new Error('oops');
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case REMOVE_INVITE:
      return [...state].filter((invite) => invite.id !== action.inviteId);
    case GOT_INVITES:
      return action.invites;
    default:
      return state;
  }
};
