import socket from '../socket';

// Action Type
const GOT_MESSAGES = 'GOT_MESSAGES';
const NEW_MESSAGE = 'NEW_MESSAGE';

// Action Creator
const gotMessages = (messages) => ({
  type: GOT_MESSAGES,
  messages,
});

export const newMessage = (message) => ({
  type: NEW_MESSAGE,
  message,
});

// Thunk Creator
export const fetchMessages = (threadId) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data: messages } = await axios.get(
        `/api/threads/${threadId}/messages`
      );
      dispatch(gotMessages(messages));
    } catch (error) {
      console.error(error);
    }
  };
};

export const sentMessage = (userId, threadId, content) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data: message } = await axios.post(
        `/api/users/${userId}/messages`,
        {
          threadId,
          content,
        }
      );
      socket.emit('send message', {
        message,
        to: `room ${threadId}`,
      });
      dispatch(newMessage(message));
    } catch (error) {
      console.error(error);
    }
  };
};

export const sentRoll = (userId, threadId, content) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const [_cmd, rolls] = content.split(':');
      const { data: message } = await axios.post(
        `/api/users/${userId}/messages/rolls`,
        {
          threadId,
          rolls,
        }
      );
      socket.emit('send roll', {
        message,
        to: `room ${threadId}`,
      });
      dispatch(newMessage(message));
    } catch (error) {
      console.error(error);
    }
  };
};

export const sentScene = (userId, threadId, sceneId) => {
  return async (dispatch, getState, { axios }) => {
    try {
      const {
        data: message,
      } = await axios.post(`/api/users/${userId}/messages/scenes/${sceneId}`, {
        threadId,
      });
      socket.emit('send message', {
        message,
        to: `room ${threadId}`,
      });
      dispatch(newMessage(message));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GOT_MESSAGES:
      return action.messages;
    case NEW_MESSAGE:
      return [action.message, ...state];
    default:
      return state;
  }
};
