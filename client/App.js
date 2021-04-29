import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Chat from './components';
import AuthContainer from './components/Auth/AuthContainer';

function App({ isLoggedIn }) {
  return (
    <>
      <h1>Welcome to RPG Chat!</h1>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/" />
          <Route path="/game/:gameId" component={Chat} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={AuthContainer} />
          <Route path="/signup" component={AuthContainer} />
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  );
}

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
});

export default connect(mapState)(App);
