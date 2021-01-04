import React from "react";
import axios from "axios";
import { withAuth } from "./../../context/auth-context";
import workshopService from "./../../lib/workshop-service";
import "./AddWorkshop.css";

class AddWorkshop extends React.Component {
  state = {
    title: "",
    img: "",
    description: "",
    category: "",
    date: "",
    length: 0,
    credits: 0,
    maxParticipants: "",
    location: "",
  };

  handleInput = (event) => {
    let { name, value, type } = event.target;
    console.log(value);

    if (type === "checkbox") {
      value = !this.state[name];
    }

    if (name === "length") {
      this.setState({ credits: Math.round((value / 60) * 10) });
    }

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Button submitted");

    const {
      title,
      img,
      description,
      category,
      date,
      length,
      credits,
      maxParticipants,
      location,
    } = this.state;

    const userId = this.props.user._id;

    workshopService
      .addOneWorkshop(
        title,
        img,
        description,
        date,
        category,
        length,
        credits,
        maxParticipants,
        location,
        userId
      )
      .then((data) => {
        this.props.createWorkshop();
      });
  };

  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];

    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new workshop in '/api/workshops' POST route
    uploadData.append("img", file);

    workshopService.uploadImage(uploadData).then((data) => {
      this.setState({ img: data.secure_url });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} class="edit-form">
        <label for="title">Name your workshop</label>
        <input
          name="title"
          type="text"
          value={this.state.title}
          placeholder="e.g. Cooking Class"
          onChange={this.handleInput}
          required
        />
        <label>Upload an Image</label>
        <input
          name="img"
          type="file"
          onChange={this.handleFileUpload}
          required
        />
        <span>
          <img
            style={{ width: "100px", marginBottom: "20px" }}
            src={this.state.img && this.state.img}
            alt=""
          ></img>
        </span>

        <label for="description">Tell us a bit about your workshop</label>
        <textarea
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.handleInput}
          required
        />

        <label>Pick a category</label>
        <div className="category-checkboxes">
          <div className="checkbox-pair">
            <label for="sports">Sports</label>
            <input
              id="small-input"
              type="radio"
              name="category"
              value="Sports"
              onChange={this.handleInput}
              required
            />
          </div>

          <div className="checkbox-pair">
            <label for="beauty">Beauty</label>
            <input
              id="small-input"
              type="radio"
              name="category"
              value="Beauty"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="languages">Languages</label>
            <input
              id="small-input"
              type="radio"
              name="category"
              value="Languages"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="creativity">Creativity</label>
            <input
              id="small-input"
              type="radio"
              name="category"
              value="Creativity"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="food-drink">Food & Drink</label>
            <input
              id="small-input"
              type="radio"
              name="category"
              value="Food & Drink"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="performing-arts">Performing Arts</label>
            <input
              id="small-input"
              type="radio"
              name="category"
              value="Performing Arts"
              onChange={this.handleInput}
            />
          </div>

          <div className="checkbox-pair">
            <label for="other">Other</label>
            <input
              id="small-input"
              type="radio"
              name="category"
              value="Other"
              onChange={this.handleInput}
            />
          </div>
        </div>

        <label for="date">What's the date and time?</label>
        <input
          name="date"
          type="datetime-local"
          value={this.state.date}
          onChange={this.handleInput}
          required
        />

        <label for="length">How long will it last (in mins)? </label>
        <input
          name="length"
          type="number"
          value={this.state.length}
          onChange={this.handleInput}
          placeholder="e.g 90"
          required
        />
        <p className="price-tag">Price: {this.state.credits}</p>

        <label for="maxParticipants">Maximum number of participants:</label>
        <input
          type="number"
          name="maxParticipants"
          value={this.state.maxParticipants}
          onChange={this.handleInput}
          required
        />

        <label for="location">Where will it take place?</label>
        <textarea
          type="text"
          name="location"
          value={this.state.location}
          onChange={this.handleInput}
          placeholder="e.g. Barceloneta Beach"
          required
        />

        <button type="submit" className="edit-host-workshop-btn">
          {" "}
          Host your workshop{" "}
        </button>
      </form>
    );
  }
}

export default withAuth(AddWorkshop);
