import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageContainer from './MessageContainer';
import ChatBox from './ChatBox';
import { clearMessages, fetchMessages, newMessage } from '../../store/messages';
import socket from '../../socket';

// Create conditional here to return welcome screen or Messages ?

class Main extends Component {
  componentDidMount() {
    const { recMessage } = this.props;

    socket.on('receive message', ({ message, from }) => {
      recMessage(message);
    });
    socket.on('receive roll', ({ message, from }) => {
      recMessage(message);
    });
  }

  componentDidUpdate(prevProps) {
    const { getMessages, threadId } = this.props;
    if (prevProps.threadId !== threadId) {
      getMessages(threadId);

      if (prevProps.threadId !== null) {
        socket.emit('leaveRoom', {
          room: `room ${prevProps.threadId}`,
        });
      }

      socket.emit('joinRoom', {
        room: `room ${threadId}`,
      });
    }
  }

  componentWillUnmount() {
    const { leaveGame } = this.props;
    socket.off('receive message');
    socket.off('receive roll');
    leaveGame();
  }

  render() {
    const { threadId } = this.props;
    return (
      <main role="main">
        <MessageContainer threadId={threadId} />
        <ChatBox threadId={threadId} />
      </main>
    );
  }
}

const mapDispatch = (dispatch) => ({
  getMessages: (threadId) => dispatch(fetchMessages(threadId)),
  recMessage: (message) => dispatch(newMessage(message)),
  leaveGame: () => dispatch(clearMessages()),
});

export default connect(null, mapDispatch)(Main);
