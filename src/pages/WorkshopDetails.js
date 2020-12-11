import React from "react";
import axios from "axios";
import { withAuth } from "./../context/auth-context";
import moment from "moment";

class WorkshopDetails extends React.Component {
  state = {
    title: " ",
    img: " ",
    description: " ",
    category: " ",
    date: " ",
    length: 0,
    credits: 0,
    participants: [],
    host: " ",
    location: " ",
    successMessage: " ",
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
          host,
          location,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getSingleWorkshop();
  }

  handleSubmit = () => {
    console.log("BUTTON CLICKED");
    const { id } = this.props.match.params;

    if (this.props.user) {
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
        <button type="submit" onClick={this.handleSubmit}>
          Sign up for Workshop!
        </button>
        <p>{this.state.successMessage}</p>
      </div>
    );
  }
}

export default withAuth(WorkshopDetails);
