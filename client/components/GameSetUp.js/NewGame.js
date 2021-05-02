import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGame } from '../../store/games';

class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { newGame, userId } = this.props;
    newGame(userId, evt.target.name.value);
  };

  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Game's Name:</label>
        <input
          type="text"
          value={name}
          name="name"
          id="name"
          onChange={this.handleChange}
        />
        <button type="submit">Create New Game</button>
      </form>
    );
  }
}

const mapState = (state) => ({
  userId: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  newGame: (userId, name) => dispatch(createGame(userId, name)),
});

export default connect(mapState, mapDispatch)(NewGame);
