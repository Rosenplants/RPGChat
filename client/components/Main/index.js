import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageContainer from './MessageContainer';
import ChatBox from './ChatBox';
import { fetchMessages } from '../../store/messages';
import { clearMessages, newMessage } from '../../store/actionCreators';
import socket from '../../socket';

// Create conditional here to return welcome screen or Messages ?

class Main extends Component {
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
