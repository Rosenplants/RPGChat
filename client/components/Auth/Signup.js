import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp } from '../../store/auth';
import { setError } from '../../store/error';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }

  componentDidMount() {
    const { clearError } = this.props;
    clearError();
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
    const { error } = this.props;
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
          required
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p>{error}</p>}
        <Link to="/login">Already Have An Account? Log In Here</Link>
      </form>
    );
  }
}

const mapState = (state) => ({
  error: state.error,
});

const mapDispatch = (dispatch) => ({
  sendSignUp: (userInfo) => dispatch(signUp(userInfo)),
  clearError: () => dispatch(setError('')),
});

export default connect(mapState, mapDispatch)(Signup);
