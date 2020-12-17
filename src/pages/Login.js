import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(username, password);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div id="login-page">
        <form onSubmit={this.handleFormSubmit}>
          <h1>Login</h1>
          <div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="username"
              className="signup-login-input"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="password"
              className="signup-login-input"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Login"
              className="signup-login-button"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
