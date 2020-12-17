import React from "react";
import workshopService from "./../lib/workshop-service";
import WorkshopCard from "./../components/WorkshopCard/WorkshopCard";

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
      <div>
        {this.state.workshops.map((workshop) => {
          return (
            <div key={workshop._id}>
              <WorkshopCard workshop={workshop} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default WorkshopList;
