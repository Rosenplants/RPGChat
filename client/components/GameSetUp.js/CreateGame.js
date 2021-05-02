import React, { Component } from 'react';
import NewGame from './NewGame';
import Invite from './Invite';

export default class CreateGame extends Component {
  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <div id="create-game-form">
        <h1>
          {params.gameId
            ? `Now let's add some other players!`
            : 'First step: what would you like to call this game?'}
        </h1>
        <div className="form-bubble">
          {params.gameId ? <Invite params={params} /> : <NewGame />}
        </div>
      </div>
    );
  }
}
