import React from "react";
import workshopService from "./../lib/workshop-service";
import WorkshopCard from "./../components/WorkshopCard/WorkshopCard";
import { Link } from "react-router-dom";

class WorkshopList extends React.Component {
  state = {
    workshops: [],
  };

  getWorkshopsByCategory = () => {
    const { category } = this.props.match.params;

    workshopService.getWorkshopsByCategory(category).then((data) => {
      this.setState({ workshops: data });
    });
  };

  componentDidMount() {
    this.getWorkshopsByCategory();
  }

  render() {
    return (
      <div id="workshop-list">
        <Link style={{ textDecoration: "none" }} to={"/"} className="back-btn">
          <i className="fas fa-arrow-left"></i> Back to home page
        </Link>
        <h3>{this.props.match.params.category}</h3>
        <div className="card-grid">
          {this.state.workshops.map((workshop) => {
            return (
              <div key={workshop._id}>
                <WorkshopCard workshop={workshop} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default WorkshopList;
