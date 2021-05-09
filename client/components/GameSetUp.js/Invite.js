import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { assocUser } from '../../store/games';

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { params, inviteUser, userId } = this.props;
    if (evt.target.email) {
      inviteUser(
        { email: evt.target.email.value, inviter: userId },
        params.gameId
      );
    } else {
      inviteUser(
        { username: evt.target.username.value, inviter: userId },
        params.gameId
      );
    }
  };

  render() {
    const { email, username } = this.state;
    const { params, error } = this.props;
    return (
      <>
        <div className="form flex-row">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Invite by email:</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={this.handleChange}
            />
            <button type="submit">Invite by Email</button>
          </form>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Invite by username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
            <button type="submit">Invite by Username</button>
          </form>
        </div>
        {error && <p>{error}</p>}
        <button
          type="button"
          onClick={() => history.push(`/game/${params.gameId}`)}
          id="invite-start"
        >
          Start Playing!
        </button>
      </>
    );
  }
}

const mapState = (state) => ({
  userId: state.auth.id,
  error: state.error,
});

const mapDispatch = (dispatch) => ({
  inviteUser: (inviteInfo, gameId) => dispatch(assocUser(inviteInfo, gameId)),
});

export default connect(mapState, mapDispatch)(Invite);
