import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./WorkshopCard.css";

class WorkshopCard extends React.Component {
  handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/workshops/${this.props.workshop._id}`)
      .then((response) => {
        console.log("SUCCESSFULLY DELETED");
        this.props.delete();
      })
      .catch((err) => console.log(err));
  };

  handleCancel = () => {
    const { userId } = this.props;

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

  render() {
    const workshop = this.props.workshop;

    return (
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
        <div>{this.props.showPen ? <i class="fas fa-pen"></i> : null}</div>
        <div onClick={this.handleCancel}>
          {this.props.showCross ? <i class="fas fa-times"></i> : null}
        </div>
      </div>
    );
  }
}

export default WorkshopCard;
