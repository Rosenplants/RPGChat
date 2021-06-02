/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import socket from '../socket';
import { GOT_MESSAGES, NEW_MESSAGE, CLEAR_MESSAGES } from './actionTypes';
import { gotMessages, newMessage } from './actionCreators';

// Thunk Creator
export const fetchMessages =
  (threadId) =>
  async (dispatch, getState, { axios }) => {
    try {
      const { data: messages } = await axios.get(
        `/api/threads/${threadId}/messages`
      );
      dispatch(gotMessages(messages));
    } catch (error) {
      console.error(error);
    }
  };

export const sentMessage =
  (userId, threadId, content) =>
  async (dispatch, getState, { axios }) => {
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

export const sentRoll =
  (userId, threadId, content) =>
  async (dispatch, getState, { axios }) => {
    try {
      const [_cmd, rolls] = content.split(':');
      const { data: message } = await axios.post(
        `/api/users/${userId}/messages/rolls`,
        {
          threadId,
          rolls,
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

export const sentScene =
  (userId, threadId, sceneId) =>
  async (dispatch, getState, { axios }) => {
    try {
      const { data: message } = await axios.post(
        `/api/users/${userId}/messages/scenes/${sceneId}`,
        {
          threadId,
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

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case CLEAR_MESSAGES:
      return [];
    case GOT_MESSAGES:
      return action.messages;
    case NEW_MESSAGE:
      return [action.message, ...state];
    default:
      return state;
  }
};
