import React from "react";
import axios from "axios";

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
    location: "",
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
    
  }


  render() {
    const date = JSON.stringify(new Date(this.state.date));

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
      </div>
    );
  }
}

export default WorkshopDetails;
