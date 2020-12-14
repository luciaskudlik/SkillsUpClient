import React from "react";
import axios from "axios";

import WorkshopCard from "./../components/WorkshopCard/WorkshopCard";

class WorkshopList extends React.Component {

  state={
    workshops: []
  }

  getWorkshopsByCategory = () => {
    const { category } = this.props.match.params;
    axios.get(`${process.env.REACT_APP_API_URL}/api/workshops/category/${category}`)
      .then((apiResponse) => {
        this.setState({workshops: apiResponse.data});
      })
      .catch((err) => console.log(err))
  }

  componentDidMount(){
    this.getWorkshopsByCategory();
  }

  render() {
    return (
      <div>
        <h1>WorkshopList Page</h1>
        {
          this.state.workshops.map((workshop) => {
            return (
              <div key={workshop._id}>
                <WorkshopCard workshop={workshop} />
              </div>
            )
        })
        }
      </div>
    );
  }
 
}

export default WorkshopList;
