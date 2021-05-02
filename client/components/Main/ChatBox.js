import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sentMessage, sentRoll } from '../../store/messages';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.content.value.includes('!roll:')) {
      const { sendRoll, user, threadId } = this.props;
      sendRoll(user.id, threadId, evt.target.content.value);
    } else {
      const { sendMessage, user, threadId } = this.props;
      sendMessage(user.id, threadId, evt.target.content.value);
    }
    this.setState({
      content: '',
    });
  };

  render() {
    const { threadId } = this.props;
    return (
      <div id="chatbox">
        <form id="user-msg-input" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="content"
            id="userText"
            placeholder="Are we doing it???"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <button type="submit" disabled={threadId === null}>
            Send Message
          </button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.auth,
});

const mapDispatch = (dispatch) => ({
  sendMessage: (userId, threadId, content) => {
    dispatch(sentMessage(userId, threadId, content));
  },
  sendRoll: (userId, threadId, message) =>
    dispatch(sentRoll(userId, threadId, message)),
});

export default connect(mapState, mapDispatch)(ChatBox);
