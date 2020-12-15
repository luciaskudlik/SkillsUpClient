import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {

    return (
      <div id="footer-div">
        <p>Follow Us</p>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-facebook-f"></i>
        <i className="far fa-envelope"></i>
        <i className="fab fa-twitter"></i>
        <p id="disclaimer">disclaimer</p>
      </div>
      
    );
  }
}

export default Footer;
