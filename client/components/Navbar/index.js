import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadList from './ThreadList';

class Navbar extends Component {
  render() {
    const { threads } = this.props;
    return (
      <nav role="nav">
        {threads.map((thread) => (
          <ThreadList thread={thread} key={thread.id} />
        ))}
      </nav>
    );
  }
}

const mapState = (state) => ({
  threads: state.threads,
});

export default connect(mapState)(Navbar);
