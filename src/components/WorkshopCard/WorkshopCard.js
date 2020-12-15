import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./WorkshopCard.css";
import EditWorkshop from "./../EditWorkshop/EditWorkshop";
import { withAuth } from "../../context/auth-context";
import moment from "moment";

class WorkshopCard extends React.Component {
  state = {
    showEditForm: false,
    host: {}
  };

  componentDidMount = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/workshops/${this.props.workshop._id}`,
      )
      .then((response) => {
        this.setState({host: response.data.host})
      })
      .catch((err) => console.log(err));

  }

  handleDelete = () => {
    const userId = this.props.user._id;
    const user = this.props.user;
    console.log("USERID", userId);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/workshops/${this.props.workshop._id}`,
        { userId },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("SUCCESSFULLY DELETED");
        this.props.delete();
      })
      .catch((err) => console.log(err));
  };

  handleCancel = () => {
    const userId = this.props.user._id;
    console.log(userId);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/workshops/cancel/${this.props.workshop._id}`,
        { userId },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("SUCCESSFULLY CANCELLED");
        this.props.cancel();
      })
      .catch((err) => console.log(err));
  };

  handleEdit = () => {
    this.setState({ showEditForm: !this.state.showEditForm });
    this.props.edit();
  };

  render() {
    const workshop = this.props.workshop;
    const date = moment(workshop.date).format('ll'); 

    return (
      <div>
      
        <div className="workshop-card">
          <Link to={`/workshops/${workshop._id}`}>
            <div className="card-image">
              <img className="workshop-card-img" src={workshop.img} alt="" />
            </div>
          </Link>

            <div id="card-information">
            <div id="card-top">
              <p><i className="far fa-clock"></i> {date}</p>
              <p className="credits">{workshop.credits} credits</p>
            </div>
            <Link to={`/workshops/${workshop._id}`}>
              <h3 id="card-title">{workshop.title}</h3>
            </Link>

            <div id="card-bottom">

              { this.state.host ? (
                <div id="card-host-container">
                  <img id="workshop-card-host-img" src={this.state.host.img} alt=""/>
                  <p>{this.state.host.username}</p>
                </div>
                ) : null }
       
              <div className="icons">
                <div onClick={this.handleDelete}>
                  {this.props.showBin ? <i className="fas fa-trash-alt"></i> : null}
                </div>
                <div onClick={this.handleEdit}>
                  {this.props.showPen ? <i className="fas fa-pen"></i> : null}
                </div>
                <div onClick={this.handleCancel}>
                  {this.props.showCross ? (
                    <div>
                      <i className="fas fa-times"></i>
                    </div>
                    ) : null}
                </div>
              </div>
          </div>
          </div>
        </div>
        

        <div>
          {this.state.showEditForm ? (
            <EditWorkshop workshop={workshop} edit={this.handleEdit} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default withAuth(WorkshopCard);
