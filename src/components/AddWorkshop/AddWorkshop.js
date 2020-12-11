import React from "react";
import axios from "axios";
import { withAuth } from "./../../context/auth-context";

class AddWorkshop extends React.Component {
  state = {
    title: "",
    description: "",
    category: "",
    date: "",
    length: 0,
    credits: 0,
    maxParticipants: 0,
    location: "",
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;
    console.log(value);

    if (type === "checkbox") {
      value = !this.state[name];
    }

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Buttton submitted");
    const {
      title,
      description,
      category,
      date,
      length,
      credits,
      maxParticipants,
      location,
    } = this.state;

    const userId = this.props.user._id;

    axios
      .post(
        "http://localhost:5000/api/workshops",
        {
          title,
          description,
          date,
          category,
          length,
          credits,
          maxParticipants,
          location,
          userId,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("sent to DB", response.data);
        this.props.createWorkshop(response.data);
      })
      .catch((err) => console.log(err));

    //clear form here
    this.setState({
      title: "",
      description: "",
      category: "",
      date: "",
      length: 0,
      credits: 0,
      maxParticipants: 0,
      location: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Workshop"
          value={this.state.title}
          onChange={this.handleInput}
        />
        <textarea
          name="description"
          type="text"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleInput}
        />
        <div>
          <label for="sports">Sports</label>
          <input
            type="radio"
            name="category"
            id="sports"
            value="Sports"
            onChange={this.handleInput}
          />

          <label for="beauty">Beauty</label>
          <input
            type="radio"
            name="category"
            id="beauty"
            value="Beauty"
            onChange={this.handleInput}
          />

          <label for="languages">Languages</label>
          <input
            type="radio"
            name="category"
            id="languages"
            value="Languages"
            onChange={this.handleInput}
          />

          <label for="creativity">Creativity</label>
          <input
            type="radio"
            name="category"
            id="creativity"
            value="Creativity"
            onChange={this.handleInput}
          />

          <label for="food-drink">Food & Drink</label>
          <input
            type="radio"
            name="category"
            id="food-drink"
            value="Food & Drink"
            onChange={this.handleInput}
          />

          <label for="performing-arts">Performing Arts</label>
          <input
            type="radio"
            name="category"
            id="performing-arts"
            value="Performing Arts"
            onChange={this.handleInput}
          />

          <label for="other">Other</label>
          <input
            type="radio"
            name="category"
            id="other"
            value="Other"
            onChange={this.handleInput}
          />
        </div>

        <input
          name="date"
          type="date"
          value={this.state.date}
          onChange={this.handleInput}
        />
        <input
          name="length"
          type="number"
          placeholder="duration"
          value={this.state.length}
          onChange={this.handleInput}
        />
        <input
          name="credits"
          type="number"
          placeholder="credits"
          value={this.state.credits}
          onChange={this.handleInput}
        />
        <input
          type="number"
          name="maxParticipants"
          placeholder="max number of participants"
          value={this.state.maxParticipants}
          onChange={this.handleInput}
        />
        <textarea
          type="text"
          name="location"
          placeholder="location"
          value={this.state.location}
          onChange={this.handleInput}
        />

        <button type="submit"> Host your workshop </button>
      </form>
    );
  }
}

export default withAuth(AddWorkshop);
