import React, { Component } from 'react';
import Messages from './Messages';
import ChatBox from './ChatBox';

export default class Main extends Component {
  render() {
    return (
      <main role="main">
        <Messages />
        <ChatBox />
      </main>
    );
  }
}
