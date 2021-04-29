import React from 'react';

export default function ThreadList({ thread }) {
  return (
    <div id={thread.name}>
      <span className="thread-title">{thread.name}</span>
    </div>
  );
}
