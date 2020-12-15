import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";
import axios from "axios";

class Signup extends Component {
  state = {
    username: "",
    img:
      "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?b=1&k=6&m=1214428300&s=612x612&w=0&h=kMXMpWVL6mkLu0TN-9MJcEUx1oSWgUq8-Ny6Wszv_ms=",
    email: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, img, email, password } = this.state;

    this.props.signup(username, img, email, password);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];

    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new project in '/api/projects' POST route
    uploadData.append("img", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/upload`, uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ img: response.data.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div id="signup-page">
        

        <form onSubmit={this.handleFormSubmit}>
        <h1>Sign Up</h1>
          <div>
            <span>
              <img
                id="uploaded-img"
                style={{ width: "100px" }}
                src={this.state.img && this.state.img}
                alt=""
              ></img>
            </span>
            <input
              name="img"
              type="file"
              onChange={this.handleFileUpload}
            ></input>
          </div>

          <div>
            <input
              type="text"
              name="username"
              className="signup-login-input"
              value={username}
              onChange={this.handleChange}
              placeholder="username"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              className="signup-login-input"
              value={email}
              onChange={this.handleChange}
              placeholder="email"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              className="signup-login-input"
              value={password}
              onChange={this.handleChange}
              placeholder="password"
            />
          </div>
          <div>
            <input type="submit" value="Signup" id="signup-button" />
          </div>
        </form>

        <p>Already have an account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);

// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;
