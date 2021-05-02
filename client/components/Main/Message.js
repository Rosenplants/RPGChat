import React from 'react';

export default function Message({ content, statusClass }) {
  return (
    <div className={`message ${statusClass}`}>
      <p className="messageContent">{content}</p>
    </div>
  );
}
