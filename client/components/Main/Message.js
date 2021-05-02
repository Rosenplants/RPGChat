import React from 'react';

export default function Message({ content, statusClass, username }) {
  return (
    <div className={`msg-box ${statusClass}`}>
      {username ? <span className="msg-username">{username}</span> : ''}
      <div className={`message ${statusClass}`}>
        <p className="messageContent">{content}</p>
      </div>
    </div>
  );
}
