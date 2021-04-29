import React from 'react';

export default function AuthContainer(props) {
  console.log(props.location.pathname);
  return (
    <div id="auth-form">
      <div className="form-bubble">
        <h4>Woo</h4>
      </div>
    </div>
  );
}
