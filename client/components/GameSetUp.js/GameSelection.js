import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { fetchGames } from '../../store/games';
import { fetchInvites, acceptInvite, rejectInvite } from '../../store/invites';

class GameSelection extends Component {
  componentDidMount() {
    const { getGames, getInvites, id } = this.props;
    getGames(id);
    getInvites(id);
  }

  handleAccept(inviteId) {
    const { accept, id } = this.props;
    accept(inviteId, id);
  }

  handleReject(inviteId) {
    const { reject } = this.props;
    reject(inviteId);
  }

  render() {
    const { games, invites } = this.props;
    return (
      <div className="flex-column game-select">
        <h3>Which Room Would You Like To Enter?</h3>
        {games.length ? (
          <>
            {games.map((game) => (
              <Link to={`/game/${game.id}`} key={game.id}>
                {game.name}
              </Link>
            ))}
          </>
        ) : (
          `You haven't joined any games yet`
        )}
        <h4>Game Invitations</h4>
        {invites.length ? (
          <>
            {invites.map((invite) => {
              return (
                <div className="flex-row invitation" key={invite.id}>
                  <p>
                    You have been invited to play in {invite.group.name} by{' '}
                    {invite.inviter.username}
                  </p>
                  <button
                    type="button"
                    onClick={(evt) => this.handleAccept(invite.id)}
                  >
                    Accept Invite
                  </button>
                  <button
                    type="button"
                    onClick={(evt) => this.handleReject(invite.id)}
                  >
                    Reject Invite
                  </button>
                </div>
              );
            })}
          </>
        ) : (
          <p>You haven't been invited to any new games</p>
        )}
        <button type="button" onClick={() => history.push('/game/new')}>
          Start a new game?
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({
  games: state.games,
  id: state.auth.id,
  invites: state.invites,
});

const mapDispatch = (dispatch) => ({
  getGames: (userId) => {
    dispatch(fetchGames(userId));
  },
  getInvites: (userId) => {
    dispatch(fetchInvites(userId));
  },
  accept: (inviteId, userId) => dispatch(acceptInvite(inviteId, userId)),
  reject: (inviteId) => dispatch(rejectInvite(inviteId)),
});

export default connect(mapState, mapDispatch)(GameSelection);
