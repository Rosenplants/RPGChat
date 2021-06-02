import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from '../../store/auth';
import { setError } from '../../store/actionCreators';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    const { sendLogIn } = this.props;
    sendLogIn(evt.target.email.value, evt.target.password.value);
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
        <button type="submit">Log In</button>
        {error && <p>{error}</p>}
        <Link to="/signup">Sign Up For An Account Here</Link>
      </form>
    );
  }
}

const mapState = (state) => ({
  error: state.error,
});

const mapDispatch = (dispatch) => ({
  sendLogIn: (email, password) => dispatch(logIn(email, password)),
  clearError: () => dispatch(setError('')),
});

export default connect(mapState, mapDispatch)(Login);
