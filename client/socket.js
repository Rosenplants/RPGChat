import { io } from 'socket.io-client';

// will window.location.origin work locally and deployed ?? who knows ??
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

export default socket;
