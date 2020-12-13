import React from "react";
import axios from "axios";
import { withAuth } from "./../context/auth-context";
import moment from "moment";

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
    host: " ",
    location: " ",
    successMessage: " ",
    showErrorMessage: false,
    errorMessage: "",
  };

  getSingleWorkshop = () => {
    const { id } = this.props.match.params;
    axios
      .get(`http://localhost:5000/api/workshops/${id}`)
      .then((apiResponse) => {
        const theWorkshop = apiResponse.data;
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
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getSingleWorkshop();

    axios
      .get(`http://localhost:5000/api/user`, { withCredentials: true })
      .then((response) => {
        this.setState({
          wallet: response.data.wallet,
          attendedWorkshops: response.data.attendedWorkshops,
        });
      })
      .catch((err) => console.log(err));
  }

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
        axios
          .post(`http://localhost:5000/api/workshops/signup/${id}`, { userId })
          .then((res) => {
            console.log(res);
            this.setState({
              successMessage: "You successfully signed up for this workshop.",
            });
          })
          .catch((error) => console.log("ERROR ", error));
      }
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    const date = moment(this.state.date).format("LLLL");

    return (
      <div>
        <h1>WorkshopDetails Page</h1>
        <h2>{this.state.title}</h2>
        <img src={this.state.img} alt="" />
        <p>{this.state.description}</p>
        <p>{date}</p>
        <p>{this.state.length} mins</p>
        <p>price: {this.state.credits} credits</p>
        <p>{this.state.location}</p>

        <h4>These people are already signed up:</h4>

        {this.state.participants.map((person) => {
          return <img src={person.img} alt="" />;
        })}

        {this.state.participants.length === this.state.maxParticipants ? (
          <p>this course is full!!!!!</p>
        ) : (
          <button type="submit" onClick={this.handleSubmit}>
            Sign up for Workshop!
          </button>
        )}

        {this.state.showErrorMessage ? <p>{this.state.errorMessage}</p> : null}
        <p>{this.state.successMessage}</p>
      </div>
    );
  }
}

export default withAuth(WorkshopDetails);
