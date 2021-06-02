import socket from './index';
import { newMessage } from '../store/actionCreators';

export default function addDispatch(store) {
  socket.on('receive message', ({ message }) => {
    store.dispatch(newMessage(message));
  });
}
