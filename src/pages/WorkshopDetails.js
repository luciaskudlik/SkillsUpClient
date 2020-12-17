import React from "react";
import { withAuth } from "./../context/auth-context";
import moment from "moment";
import workshopService from "./../lib/workshop-service";
import { Link } from "react-router-dom";

class WorkshopDetails extends React.Component {
  state = {
    wallet: 0,
    attendedWorkshops: [],
    title: " ",
    img: " ",
    description: " ",
    category: " ",
    date: " ",
    length: 0,
    credits: 0,
    participants: [],
    maxParticipants: 0,
    host: {},
    location: " ",
    successMessage: " ",
    showErrorMessage: false,
    showSuccessMessage: false,
    errorMessage: "",
  };

  getSingleWorkshop = () => {
    const { id } = this.props.match.params;
    workshopService.getOneWorkshop(id).then((data) => {
      const theWorkshop = data;
      const {
        title,
        img,
        description,
        category,
        date,
        length,
        credits,
        participants,
        maxParticipants,
        host,
        location,
      } = theWorkshop;
      this.setState({
        title,
        img,
        description,
        category,
        date,
        length,
        credits,
        participants,
        maxParticipants,
        host,
        location,
      });
    });
  };

  componentDidMount = () => {
    this.getSingleWorkshop();

    {
      this.props.user &&
        workshopService.getUser().then((data) => {
          this.setState({
            wallet: data.wallet,
            attendedWorkshops: data.attendedWorkshops,
          });
        });
    }
  };

  handleSubmit = () => {
    console.log("BUTTON CLICKED");
    const { id } = this.props.match.params;

    if (this.props.user) {
      const { wallet } = this.state;
      const { attendedWorkshops } = this.state;
      console.log("attendedn workshop", attendedWorkshops);
      console.log(wallet);

      const alreadySignedUp = attendedWorkshops.filter((workshop) => {
        return workshop._id === this.props.match.params.id;
      });

      if (alreadySignedUp.length > 0) {
        this.setState({
          showErrorMessage: true,
          errorMessage: "You've already signed up for this workshop.",
        });
      } else if (wallet < this.state.credits) {
        this.setState({
          showErrorMessage: true,
          errorMessage:
            "You don't have enough credit points to sign up for this event. Host your own workshop to earn more credits.",
        });
      } else {
        const { id } = this.props.match.params;
        const userId = this.props.user._id;
        console.log(id);

        workshopService.signupForWorkshop(id, userId).then((data) => {
          this.setState({
            showSuccessMessage: true,
            successMessage: "You successfully signed up for this workshop.",
          });
        });
      }
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    const date = moment(this.state.date).format("LLLL");

    return (
      <div id="details-container">
        <Link
          style={{ textDecoration: "none" }}
          to={`/workshops/category/${this.state.category}`}
          class="back-btn"
        >
          <i class="fas fa-arrow-left"></i> Back to results
        </Link>
        <p id="details-date">{date}</p>
        <h2 id="workshop-title">{this.state.title}</h2>
        <div id="details-img-container">
          <img id="details-img" src={this.state.img} alt="" />
        </div>

        <div id="info-card">
          <p id="details-date">
            <i className="fas fa-calendar-alt"></i> {date}
          </p>
          <p>
            <i className="far fa-clock"></i> {this.state.length} mins
          </p>
          <p>
            <i className="fas fa-coins"></i> {this.state.credits} credits
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> {this.state.location}
          </p>
          {this.state.host ? (
            <div id="host-div">
              <h4>Hosted by:</h4>
              <img className="participant-img" src={this.state.host.img} />
              <p>{this.state.host.username}</p>
            </div>
          ) : null}
        </div>

        <p id="details-description">{this.state.description}</p>

        {this.state.participants.length === this.state.maxParticipants ? (
          <p className="alert alert-warning">This course is fully booked.</p>
        ) : (
          <div id="signup-workshop-btn">
            <button type="submit" onClick={this.handleSubmit}>
              Sign up for Workshop
            </button>
          </div>
        )}

        {this.state.showErrorMessage ? (
          <p className="alert alert-warning">{this.state.errorMessage}</p>
        ) : null}
        {this.state.showSuccessMessage ? (
          <p className="alert alert-success">{this.state.successMessage}</p>
        ) : null}

        {this.state.participants.length > 0 && (
          <div>
            <h4 id="attendees">These people are already signed up:</h4>

            {this.state.participants.map((person) => {
              return (
                <img className="participant-img" src={person.img} alt="" />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(WorkshopDetails);
