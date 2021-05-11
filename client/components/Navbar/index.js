import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadLi from './ThreadLi';
import { logUserOut } from '../../store/auth';

class Navbar extends Component {
  handleLogOut = () => {
    const { logOut } = this.props;
    logOut();
  };

  render() {
    const { threads, gameId, threadId, username, gameName } = this.props;
    return (
      <nav role="navigation">
        <h2>{gameName}</h2>
        <h3>Welcome, {username}!</h3>
        <a href="/" onClick={this.handleLogOut}>
          Logout
        </a>
        <Link to="/">Go Back to Game Selection?</Link>
        <Link to={`/game/${gameId}/invite`}>Invite others?</Link>
        <Link to={`/game/${gameId}`}>Welcome Screen</Link>
        <h4>Open Rooms:</h4>
        {threads.map((thread) => (
          <ThreadLi
            thread={thread}
            threadURL={`/game/${gameId}/${thread.id}`}
            key={thread.id}
            URLThread={threadId}
          />
        ))}
      </nav>
    );
  }
}

const mapState = (state) => ({
  threads: state.threads,
  username: state.auth.username,
  gameName: state.gameName,
});

const mapDispatch = (dispatch) => ({
  logOut: () => dispatch(logUserOut()),
});

export default connect(mapState, mapDispatch)(Navbar);
