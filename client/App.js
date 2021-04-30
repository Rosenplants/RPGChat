import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Chat from './components';
import AuthContainer from './components/Auth/AuthContainer';
import GameSelection from './components/Auth/GameSelection';
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
            <Route path="/game" component={Chat} />
            <Redirect to="/" />
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
