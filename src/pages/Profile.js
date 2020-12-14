import axios from "axios";
import React, { Component } from "react";
import AddWorkshop from "../components/AddWorkshop/AddWorkshop";
import WorkshopCard from "../components/WorkshopCard/WorkshopCard";
import { withAuth } from "../context/auth-context";

class Profile extends Component {
  state = {
    wallet: 0,
    attendedWorkshops: [],
    hostedWorkshops: [],
    showForm: false,
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          hostedWorkshops: response.data.hostedWorkshops,
          attendedWorkshops: response.data.attendedWorkshops,
          wallet: response.data.wallet,
        });
      })
      .catch((err) => console.log(err));
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  addOneWorkshop = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          hostedWorkshops: response.data.hostedWorkshops,
          wallet: response.data.wallet,
        });
      })
      .catch((err) => console.log(err));

    this.toggleForm();
  };

  deleteOneWorkshop = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          hostedWorkshops: response.data.hostedWorkshops,
          wallet: response.data.wallet,
        });
      })
      .catch((err) => console.log(err));
  };

  editOneWorkshop = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          hostedWorkshops: response.data.hostedWorkshops,
          wallet: response.data.wallet,
        });
      })
      .catch((err) => console.log(err));
  };

  cancelOneWorkshop = () => {
    console.log("cancel funcito was called'")
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          attendedWorkshops: response.data.attendedWorkshops,
          wallet: response.data.wallet,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div id="profile-page">
        <h2>Welcome {this.props.user && this.props.user.username}</h2>
        <img id="profile-image" src={this.props.user.img} />
        <p>Your Wallet: {this.state.wallet} </p>
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
                  edit={this.editOneWorkshop}
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
                <WorkshopCard workshop={workshop} showCross={true} cancel={this.cancelOneWorkshop} />
              </div>
            );
          })
          .reverse()}
      </div>
    );
  }
}

export default withAuth(Profile);
