import React, { Component } from 'react';

export default class ChatBox extends Component {
  render() {
    return (
      <div id="chatbox">
        <form>
          <input
            type="text"
            name="content"
            id="userText"
            placeholder="Are we doing it???"
          />
        </form>
      </div>
    );
  }
}
