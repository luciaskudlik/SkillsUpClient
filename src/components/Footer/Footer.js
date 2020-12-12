import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {

    return (
      <div id="footer-div">
        <p>Follow Us</p>
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-instagram"></i>
        <i class="far fa-envelope"></i>
        <i class="fab fa-twitter"></i>
        <p id="disclaimer">disclaimer</p>
      </div>
      
    );
  }
}

export default Footer;
