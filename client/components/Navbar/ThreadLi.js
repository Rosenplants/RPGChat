import React from 'react';
import { Link } from 'react-router-dom';

export default function ThreadLi({ thread, threadURL }) {
  return (
    <div className={`${thread.name}`}>
      <Link to={threadURL} className="thread-title">
        {thread.name}
      </Link>
    </div>
  );
}
