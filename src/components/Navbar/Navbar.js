import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../context/auth-context";
import "./Navbar.css";

class Navbar extends Component {
  handleDayMode = () => {
    this.props.setDayMode();
  };

  handleNightMode = () => {
    this.props.setNightMode();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="nav-left">
            <Link to={"/"} className="navbar-brand">
              SkillsUp
            </Link>

            <Link to="/private/profile">
              {this.props.user ? <img src={this.props.user.img} /> : null}
            </Link>
          </div>
          <span>
            <button id="sun-btn" onClick={this.handleDayMode}>
              <i class="fas fa-sun"></i>
            </button>
            <button id="moon-btn" onClick={this.handleNightMode}>
              <i class="fas fa-moon"></i>
            </button>
          </span>
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
                  <Link className="nav-link" to={"/signup"}>
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
