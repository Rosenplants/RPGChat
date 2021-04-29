import React from 'react';

export default function ThreadLi({ thread }) {
  return (
    <div id={thread.name}>
      <span className="thread-title">{thread.name}</span>
    </div>
  );
}
