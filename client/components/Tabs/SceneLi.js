import React from 'react';

export default function SceneLi({ scene, handler }) {
  return (
    <div className="single-scene">
      <h4>{scene.name}</h4>
      <p>{scene.text}</p>
      <button type="button" value={scene.id} onClick={handler}>
        Send Scene to Group
      </button>
    </div>
  );
}
