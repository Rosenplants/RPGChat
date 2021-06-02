// A file for all action creators
// To help break up logic and avoid cyclic dependencies
import * as type from './actionTypes';

// Auth
export const setAuth = (auth) => ({ type: type.SET_AUTH, auth });
export const setLogOut = () => ({ type: type.SET_AUTH, auth: {} });

// Character
export const gotCharacter = (character) => ({
  type: type.GOT_CHARACTER,
  character,
});

export const updatedCharacter = (character) => ({
  type: type.UPDATED_CHARACTER,
  character,
});

// Errors
export const setError = (errorMsg) => ({
  type: type.SET_ERROR,
  errorMsg,
});

// Game Name
export const gotName = (name) => ({
  type: type.GOT_NAME,
  name,
});

// Games
export const gotGames = (games) => ({
  type: type.GOT_GAMES,
  games,
});

// Invites
export const gotInvites = (invites) => ({
  type: type.GOT_INVITES,
  invites,
});

export const removeInvite = (inviteId) => ({
  type: type.REMOVE_INVITE,
  inviteId,
});

// Messages
export const gotMessages = (messages) => ({
  type: type.GOT_MESSAGES,
  messages,
});

export const newMessage = (message) => ({
  type: type.NEW_MESSAGE,
  message,
});

export const clearMessages = () => ({
  type: type.CLEAR_MESSAGES,
});

// Scenes
export const gotScenes = (scenes) => ({
  type: type.GOT_SCENES,
  scenes,
});

// Tab Open
export const setTab = (tabName) => ({
  type: type.SET_TAB,
  tabName,
});

// Threads
export const gotThreads = (threads) => ({
  type: type.GOT_THREADS,
  threads,
});
