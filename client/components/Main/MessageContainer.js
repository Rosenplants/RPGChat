import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Message from './Message';

function MessageContainer({ messages, userId }) {
  if (!messages.length) return <div id="messages-container">Welcome</div>;
  return (
    <div id="messages-container">
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          statusClass={+message.userId === userId ? 'sent' : 'received'}
        />
      ))}
    </div>
  );
}

const mapState = (state) => ({
  messages: state.messages,
  userId: state.auth.id,
});

export default connect(mapState)(MessageContainer);
