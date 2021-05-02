import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sentMessage } from '../../store/messages';

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
    const { sendMessage, user, threadId } = this.props;
    console.log(threadId);
    sendMessage(user.id, threadId, evt.target.content.value);
    this.setState({
      content: '',
    });
  };

  render() {
    const { threadId } = this.props;
    return (
      <div id="chatbox">
        <form onSubmit={this.handleSubmit}>
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
});

export default connect(mapState, mapDispatch)(ChatBox);
