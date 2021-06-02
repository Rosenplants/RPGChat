import { io } from 'socket.io-client';

const socket = io(window.location.origin, { autoConnect: false });

// debugging func to log all events received by client
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

socket.on('connect_error', (err) => {
  if (err.message === 'invalid username') {
    throw new Error('something went wrong, please try again');
  }
});

// socket listeners which need the store can be found in ./dispatchListeners in a function
// that function is called after the store is initialized in ../store/index
// I have created some wild paths to avoid cyclic dependencies
export default socket;
