import React from 'react';
import CategoryCard from './../components/CategoryCard/CategoryCard';
import './../App.css';
import SearchBar from './../components/SearchBar/SearchBar'
import axios from 'axios';
import WorkshopCard from '../components/WorkshopCard/WorkshopCard';

class Home extends React.Component {

  state = {
    workshopList: [],
    filteredWorkshops: []
  }

  componentDidMount = () => {
    axios
    .get('http://localhost:5000/api/workshops')
    .then((response) => {
      this.setState({
        workshopList: response.data
      });
    })
    .catch((err) => console.log(err));
    console.log("workshop LIIISTTTTTT", this.state.workshopList);
  }

    filterWorkshops = (input) => {
      //console.log("workshop LIIISTTTTTT", this.state.workshopList);

      const filtered = this.state.workshopList.filter((workshop) => {
        const workshopName = workshop.title.toLowerCase();
        const searchInput = input.toLowerCase();
        return workshopName.includes(searchInput);
      })
      console.log(filtered);
      this.setState({filteredWorkshops: filtered})
  }


  render() {
    return (
      <div> 
      <div id="banner">
        <h1>The key to success is dedication to life-long learning.</h1>
      </div>

        <SearchBar filterWorkshops={this.filterWorkshops} />

        
        
        {this.state.filteredWorkshops.map((workshop) => {
          return (
            <WorkshopCard workshop={workshop}/>
          )
        })}

  
        
        <CategoryCard category="Sports" id="sports"/>
        <CategoryCard category="Beauty" id="beauty"/>
        <CategoryCard category="Languages" id="languages"/>
        <CategoryCard category="Creativity" id="creativity"/>
        <CategoryCard category="Food & Drink" id="food-drink"/>
        <CategoryCard category="Performing Arts" id="performing-arts"/>
        <CategoryCard category="Other" id="other"/>

      </div>
    )
  }
}

export default Home;