import React from 'react';

export default function SceneMessage({ scene }) {
  const { name, text, imageURL, audioURL } = scene;
  return (
    <div className="scene-message">
      <h3>{name}</h3>
      <div className="scene-img-container">
        <img src={imageURL} />
      </div>
      <p>{text}</p>
    </div>
  );
}
