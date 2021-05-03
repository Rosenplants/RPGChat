import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateChar } from '../../store/character';

class CharInfo extends Component {
  constructor(props) {
    super(props);
    const { character } = this.props;
    this.state = {
      inEditMode: false,
      name: character.name,
      imageURL: character.imageURL,
      description: character.description,
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleClick = () => {
    this.setState({
      inEditMode: !this.state.inEditMode,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { sendUpdatedChar, character, gameId } = this.props;
    sendUpdatedChar({
      ...character,
      name: evt.target.name.value,
      imageURL: evt.target.imageURL.value,
      description: evt.target.description.value,
    });
    this.handleClick();
  };

  render() {
    const { inEditMode } = this.state;
    const { character } = this.props;
    if (inEditMode)
      return (
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
          <label>Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={this.state.description}
            onChange={this.handleChange}
          ></input>
          <label>Image (URL)</label>
          <input
            type="text"
            name="imageURL"
            id="imageURL"
            value={this.state.imageURL}
            onChange={this.handleChange}
          ></input>
          <button type="submit">Save Changes</button>
        </form>
      );

    return (
      <div id="CharInfo">
        <h3>Your Character</h3>
        <img src={character.imageURL} alt="your character" />
        <h4>{character.name}</h4>
        <p>{character.description}</p>
        <button type="button" onClick={this.handleClick}>
          Edit Your Character
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({
  character: state.character,
});

const mapDispatch = (dispatch) => ({
  sendUpdatedChar: (char) => dispatch(updateChar(char)),
});

export default connect(mapState, mapDispatch)(CharInfo);
