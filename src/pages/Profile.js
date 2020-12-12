import axios from "axios";
import React, { Component } from "react";
import AddWorkshop from "../components/AddWorkshop/AddWorkshop";
import WorkshopCard from "../components/WorkshopCard/WorkshopCard";
import { withAuth } from "../context/auth-context";

class Profile extends Component {
  state = {
    attendedWorkshops: [],
    hostedWorkshops: [],
    showForm: false,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          hostedWorkshops: response.data.hostedWorkshops,
        });
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:5000/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          attendedWorkshops: response.data.attendedWorkshops,
        });
      })
      .catch((err) => console.log(err));
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("Component did update");
  //   if (prevState.attendedWorkshops !== this.state.attendedWorkshops) {
  //     console.log("YAAAAAAAAY");
  //   }
  // }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  addOneWorkshop = (newWorkshop) => {
    // console.log("it works.");
    // const updatedWorkshops = [newWorkshop, ...this.state.hostedWorkshops];
    // this.setState({ hostedWorkshops: updatedWorkshops });

    axios
      .get(`http://localhost:5000/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          hostedWorkshops: response.data.hostedWorkshops,
        });
      })
      .catch((err) => console.log(err));

    this.toggleForm();
  };

  deleteOneWorkshop = () => {
    axios
      .get(`http://localhost:5000/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          hostedWorkshops: response.data.hostedWorkshops,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        <h2>Welcome {this.props.user && this.props.user.username}</h2>
        <img src={this.props.user.img} />
        <p>Your Wallet: {this.props.user.wallet} </p>
        <button onClick={this.toggleForm}>Host your own workshop</button>
        {this.state.showForm ? (
          <AddWorkshop createWorkshop={this.addOneWorkshop} />
        ) : null}

        <h2>Your hosted workshops</h2>
        {this.state.hostedWorkshops
          .map((workshop) => {
            return (
              <div key={workshop._id}>
                <WorkshopCard
                  workshop={workshop}
                  showBin={true}
                  showPen={true}
                  delete={this.deleteOneWorkshop}
                />
              </div>
            );
          })
          .reverse()}

        <h2>Your upcoming workshops</h2>
        {this.state.attendedWorkshops
          .map((workshop) => {
            return (
              <div key={workshop._id}>
                <WorkshopCard
                  workshop={workshop}
                  showCross={true}
                  userId={this.props.user._id}
                />
              </div>
            );
          })
          .reverse()}

        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
        */}
      </div>
    );
  }
}

export default withAuth(Profile);
