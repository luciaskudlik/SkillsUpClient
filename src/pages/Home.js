import React from 'react';
import CategoryCard from './../components/CategoryCard/CategoryCard';
import './../App.css';
import SearchBar from './../components/SearchBar/SearchBar'

class Home extends React.Component {

  filterWorkshops = (input) => {
    
  }

  render() {
    return (
      <div> 
      <div id="banner">
        <h1>The key to success is dedication to life-long learning.</h1>
      </div>

        <SearchBar filterWorkshops={this.filterWorkshops} />
  
        
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