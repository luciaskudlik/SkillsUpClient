import React from "react";
import CategoryCard from "./../components/CategoryCard/CategoryCard";
import "./../App.css";
import SearchBar from "./../components/SearchBar/SearchBar";
import WorkshopCard from "../components/WorkshopCard/WorkshopCard";
import { Link } from "react-router-dom";
import workshopService from "./../lib/workshop-service";

class Home extends React.Component {
  state = {
    workshopList: [],
    filteredWorkshops: [],
    showErrorMessage: false,
  };

  componentDidMount = () => {
    workshopService.getAllWorkshops().then((data) => {
      console.log(data);
      this.setState({
        workshopList: data,
      });

      console.log(this.state.workshopList);
    });
  };

  filterWorkshops = (input) => {
    const filtered = this.state.workshopList.filter((workshop) => {
      const workshopName = workshop.title.toLowerCase();
      const searchInput = input.toLowerCase();
      return workshopName.includes(searchInput);
    });

    this.setState({ filteredWorkshops: filtered, showErrorMessage: false });

    if (filtered.length === 0) {
      this.setState({ showErrorMessage: true });
    }

    if (input === "") {
      this.setState({ filteredWorkshops: [], showErrorMessage: false });
    }

    console.log(this.state.filteredWorkshops);
  };

  render() {
    return (
      <div>
        <div id="banner">
          <h1>Try something new.</h1>
          <p>Join SkillsUp to discover new skills and connect with others.</p>
          <SearchBar filterWorkshops={this.filterWorkshops} />
        </div>
        <div id="search-results">
          {this.state.showErrorMessage ? (
            <p className="alert alert-warning" id="no-results-message">
              Sorry, we couldn't match any results.
            </p>
          ) : null}
          {this.state.filteredWorkshops.map((workshop) => {
            return <WorkshopCard workshop={workshop} />;
          })}
        </div>

        <div id="description-section">
          <h4>"The key to success is dedication to life-long learning."</h4>
          <p>
            First time on our page? Click <Link to="/instructions">here</Link>{" "}
            to see how it works.
          </p>
          <Link to="/signup">
            <button>Get started for free</button>
          </Link>
        </div>

        <h2 className="category-info">Find something that intrigues you.</h2>
        <p className="category-info">Pick a category.</p>
        <div id="category-container">
          <CategoryCard category="Sports" id="sports" />
          <CategoryCard category="Beauty" id="beauty" />
          <CategoryCard category="Languages" id="languages" />
          <CategoryCard category="Creativity" id="creativity" />
          <CategoryCard category="Food & Drink" id="food-drink" />
          <CategoryCard category="Performing Arts" id="performing-arts" />
          <CategoryCard category="Other" id="other" />
        </div>
      </div>
    );
  }
}

export default Home;
