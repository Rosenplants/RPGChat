import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import Roll from './Roll';

function MessageContainer({ messages, userId, username }) {
  if (!messages.length) return <div id="messages-container">Welcome</div>;
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
