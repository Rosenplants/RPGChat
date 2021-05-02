import React from 'react';

export default function Message({ rolls, total, username }) {
  return (
    <div className="roll">
      <p>
        {username} rolled: {rolls.split(',').join(', ')}
      </p>
      <p>For a total of: </p>
      <strong>{total}</strong>
    </div>
  );
}
