import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp } from '../../store/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { sendSignUp } = this.props;
    sendSignUp(this.state);
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
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={this.state.username}
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
        <button type="submit">Sign Up</button>
        <Link to="/login">Already Have An Account? Log In Here</Link>
      </form>
    );
  }
}

const mapDispatch = (dispatch) => ({
  sendSignUp: (userInfo) => dispatch(signUp(userInfo)),
});

export default connect(null, mapDispatch)(Signup);
