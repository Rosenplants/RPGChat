import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { fetchGames } from '../../store/games';

class GameSelection extends Component {
  componentDidMount() {
    const { getGames, id } = this.props;
    getGames(id);
  }

  render() {
    const { games } = this.props;
    return (
      <div>
        <h3>Which Room Would You Like To Enter?</h3>
        {games.length ? (
          <ul>
            {games.map((game) => (
              <Link to={`/game/${game.id}`} key={game.id}>
                <li>{game.name}</li>
              </Link>
            ))}
          </ul>
        ) : (
          `You haven't joined any games yet`
        )}
        <button type="button" onClick={() => history.push('/game')}>
          Start a new game?
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({
  games: state.games,
  id: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  getGames: (userId) => {
    dispatch(fetchGames(userId));
  },
});

export default connect(mapState, mapDispatch)(GameSelection);
