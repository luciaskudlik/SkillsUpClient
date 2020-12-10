import axios from "axios";
import React, { Component } from "react";
import WorkshopCard from "../components/WorkshopCard/WorkshopCard";
import { withAuth } from "../context/auth-context";

class Profile extends Component {
  state = {
    attendedWorkshops: [],
  };

  componentDidMount() {
    console.log(this.props.user.attendedWorkshops);
    this.props.user.attendedWorkshops.map((id) => {
      axios
        .get(`http://localhost:5000/api/workshops/${id}`)
        .then((returnedObj) => {
          this.setState({
            attendedWorkshops: [
              ...this.state.attendedWorkshops,
              returnedObj.data,
            ],
          });
        })
        .catch((err) => console.log(err));
    });
  }

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        <h2>Welcome {this.props.user && this.props.user.username}</h2>
        <img src={this.props.user.img} />
        <p>Your Wallet: {this.props.user.wallet} </p>
        <h2>Your upcoming workshops</h2>
        {this.state.attendedWorkshops.map((workshop) => {
          return (
            <div key={workshop._id}>
              <WorkshopCard workshop={workshop} />
            </div>
          );
        })}
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
        */}
      </div>
    );
  }
}

export default withAuth(Profile);
