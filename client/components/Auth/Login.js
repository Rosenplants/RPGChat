import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from '../../store/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { sendLogIn } = this.props;
    sendLogIn(evt.target.email.value, evt.target.password.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type="submit">Log In</button>
        <Link to="/signup">Sign Up For An Account Here</Link>
      </form>
    );
  }
}

const mapDispatch = (dispatch) => ({
  sendLogIn: (email, password) => dispatch(logIn(email, password)),
});

export default connect(null, mapDispatch)(Login);
