import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Signup from './Signup';

export default function AuthContainer(props) {
  const {
    location: { pathname },
  } = props;
  return (
    <div id="auth-form">
      <h1>Welcome to RPG Chat!</h1>
      <div className="form-bubble">
        {pathname === '/signup' ? <Signup /> : <Login />}
      </div>
    </div>
  );
}
