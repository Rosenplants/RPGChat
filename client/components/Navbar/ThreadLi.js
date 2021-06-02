import React from 'react';
import { Link } from 'react-router-dom';

export default function ThreadLi({ thread, threadURL, URLThread }) {
  return (
    <div
      className={`${thread.name.split(' ').join('-')} threadLi ${
        +URLThread === thread.id ? 'selected' : ''
      }`}
    >
      <Link to={threadURL} className="thread-title">
        {thread.name}
      </Link>
    </div>
  );
}
