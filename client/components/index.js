/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import Main from './Main';
import Navbar from './Navbar';
import TabList from './Tabs';
import TabContainer from './Tabs/TabContainer';
import { setFullGroup } from '../store/games';

class Chat extends React.Component {
  componentDidMount() {
    const { user, getGameInfo, match } = this.props;

    getGameInfo(user.id, +match.params.gameId);
  }

  componentWillUnmount() {
    // is this the right place? we'll find out!
    socket.off('connect_error');
  }

  render() {
    const threadId = this.props.match.params.threadId || null;
    const { gameId } = this.props.match.params;
    return (
      <div id="chat">
        <Navbar gameId={gameId} threadId={threadId} />
        <Main threadId={threadId} />
        <TabContainer threadId={threadId} gameId={gameId} />
        <TabList />
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.auth,
  threads: state.threads,
});

const mapDispatch = (dispatch) => ({
  // verify: (userId, groupId) => dispatch(verifyAccess(userId, groupId)),
  getGameInfo: (userId, groupId) => dispatch(setFullGroup(userId, groupId)),
});

export default connect(mapState, mapDispatch)(Chat);
