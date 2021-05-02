import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Chat from './components';
import AuthContainer from './components/Auth/AuthContainer';
import GameSelection from './components/GameSetUp.js/GameSelection';
import CreateGame from './components/GameSetUp.js/CreateGame';
import history from './history';
import { getUser } from './store/auth';

class App extends React.Component {
  componentDidMount() {
    const { loadUser } = this.props;
    loadUser();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={GameSelection} />
            <Route path="/game/new" component={CreateGame} />
            <Route path="/game/:gameId/invite" component={CreateGame} />
            <Route path="/game/:gameId/:threadId" component={Chat} />
            <Route path="/game/:gameId" component={Chat} />
            <Route path="*" component={GameSelection} />
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
}

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch) => ({
  loadUser: () => dispatch(getUser()),
});

export default connect(mapState, mapDispatch)(App);
