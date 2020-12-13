import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./WorkshopCard.css";
import EditWorkshop from "./../EditWorkshop/EditWorkshop";
import { withAuth } from "../../context/auth-context";

class WorkshopCard extends React.Component {
  state = {
    showEditForm: false,
  };

  handleDelete = () => {
    const userId = this.props.user._id;
    console.log("USERID", userId);
    axios
      .delete(
        `http://localhost:5000/api/workshops/${this.props.workshop._id}`,
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
        `http://localhost:5000/api/workshops/cancel/${this.props.workshop._id}`,
        { userId },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("SUCCESSFULLY CANCELLED");
      })
      .catch((err) => console.log(err));
  };

  handleEdit = () => {
    this.setState({ showEditForm: !this.state.showEditForm });
    this.props.edit();
  };

  render() {
    const workshop = this.props.workshop;

    return (
      <div>
        <div className="workshop-card">
          <img className="workshop-card-img" src={workshop.img} alt="" />

          <h3>{workshop.title}</h3>
          <p>{workshop.credits}</p>
          <Link to={`/workshops/${workshop._id}`}>
            <button>Learn More</button>
          </Link>
          <div onClick={this.handleDelete}>
            {this.props.showBin ? <i class="fas fa-trash-alt"></i> : null}
          </div>
          <div onClick={this.handleEdit}>
            {this.props.showPen ? <i class="fas fa-pen"></i> : null}
          </div>
          <div onClick={this.handleCancel}>
            {this.props.showCross ? <i class="fas fa-times"></i> : null}
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
