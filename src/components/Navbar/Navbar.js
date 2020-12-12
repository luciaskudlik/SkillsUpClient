import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../context/auth-context";
import './Navbar.css';

class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <div className="nav-left">
          <Link to={"/"} className="navbar-brand">
            SkillsUp 
          </Link> 
          { this.props.user ? <img src={this.props.user.img} /> : null}
        </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to={"/"}>
                Home
              </Link>
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/instructions"}
              >
                How it works
              </Link>
              <Link className="nav-link" to={"/private/profile"}>
                My Profile
              </Link>

              {this.props.isLoggedIn ? (
                <>
                  <Link onClick={this.props.logout} className="nav-link">
                    Logout
                  </Link>
                  
                </>
              ) : (
                <>
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                  <br />
                  <Link className="nav-link" to={"/signup"}>
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      // <nav className="navbar">
      //   <Link to={'/'} id='home-btn'>
      //     <h4>Home</h4>
      //   </Link>
      //   {this.props.isLoggedIn ? (
      //     <>
      //       <p>username: {this.props.user && this.props.user.username}</p>
      //       <button onClick={this.props.logout}>Logout</button>
      //     </>
      //   ) : (
      //     <>
      //       <Link to="/login">
      //         <button className="navbar-button">Login</button>{' '}
      //       </Link>
      //       <br />
      //       <Link to="/signup">
      //         <button className="navbar-button">Sign Up</button>{' '}
      //       </Link>
      //     </>
      //   )}
      // </nav>
    );
  }
}

export default withAuth(Navbar);
