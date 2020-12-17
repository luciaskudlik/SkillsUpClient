import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = {
    search: "",
  };

  handleInput = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
    this.props.filterWorkshops(value);
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          className="input search-bar"
          name="search"
          placeholder="What fascinates you?"
          value={this.state.search}
          onChange={this.handleInput}
        />
      </div>
    );
  }
}

export default SearchBar;
