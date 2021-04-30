import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadLi from './ThreadLi';
import { logUserOut } from '../../store/auth';

class Navbar extends Component {
  handleLogOut = () => {
    const { logOut } = this.props;
    logOut();
  };

  render() {
    const { threads } = this.props;
    return (
      <nav role="navigation">
        <a href="#" onClick={this.handleLogOut}>
          Logout
        </a>
        {threads.map((thread) => (
          <ThreadLi thread={thread} key={thread.id} />
        ))}
      </nav>
    );
  }
}

const mapState = (state) => ({
  threads: state.threads,
});

const mapDispatch = (dispatch) => ({
  logOut: () => dispatch(logUserOut()),
});

export default connect(mapState, mapDispatch)(Navbar);
