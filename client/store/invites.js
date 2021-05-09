// Action Types
const GOT_INVITES = 'GOT_INVITES';

// Action Creators
const gotInvites = (invites) => ({
  type: GOT_INVITES,
  invites,
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

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GOT_INVITES:
      return action.invites;
    default:
      return state;
  }
};
