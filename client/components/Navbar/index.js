import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadLi from './ThreadLi';

class Navbar extends Component {
  render() {
    const { threads } = this.props;
    return (
      <nav role="navigation">
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

export default connect(mapState)(Navbar);
