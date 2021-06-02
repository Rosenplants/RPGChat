import { io } from 'socket.io-client';
import store from './store';
import { newMessage } from './store/messages';

const socket = io(window.location.origin, { autoConnect: false });

// debugging func to log all events received by client
socket.onAny((event, ...args) => {
  // console.log(event, args);
});

socket.on('connect_error', (err) => {
  if (err.message === 'invalid username') {
    throw new Error('something went wrong, please try again');
  }
});

socket.on('receive message', ({ message, from }) => {
  store.dispatch(newMessage(message));
});
// socket.on('receive roll', ({ message, from }) => {
//   recMessage(message);
// });

export default socket;
