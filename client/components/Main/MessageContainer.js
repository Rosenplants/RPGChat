import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import Roll from './Roll';

function MessageContainer({ messages, userId, username }) {
  if (!messages.length)
    return (
      <div id="welcome">
        <h1>Welcome!</h1>
        <p>Some quick notes:</p>
        <p>Type in the chatbox in any room to talk to others in it.</p>
        <p>If you'd like to roll some dice, just type in this format:</p>
        <ul>
          <li>!roll:1d6</li>
          <li>!roll:2d6,1d8</li>
        </ul>
      </div>
    );
  let count = 0;
  return (
    <div id="messages-container">
      {messages.map((message) => {
        count += 1;
        if (message.roll) {
          return (
            <Roll
              key={message.id}
              rolls={message.roll.userInput}
              total={message.roll.totalValue}
              username={message.user ? message.user.username : username}
            />
          );
        }
        return (
          <Message
            key={message.id || `rec${count}`}
            content={message.content}
            username={message.user ? message.user.username : username}
            statusClass={+message.userId === userId ? 'sent' : 'received'}
          />
        );
      })}
    </div>
  );
}

const mapState = (state) => ({
  messages: state.messages,
  userId: state.auth.id,
  username: state.auth.username,
});

export default connect(mapState)(MessageContainer);
