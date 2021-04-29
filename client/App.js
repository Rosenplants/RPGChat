import React from 'react';
import { connect } from 'react-redux';
import Chat from './components';

function App(props) {
  const isLoggedIn = props;
  return <>{isLoggedIn ? <Chat /> : <div>Hello, world!</div>}</>;
}

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
});

export default connect(mapState)(App);
