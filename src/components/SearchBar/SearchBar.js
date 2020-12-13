import React from 'react';

class SearchBar extends React.Component {

  state ={
    search: ''
  }

  handleInput = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: (value) })
    this.props.filterWorkshops(value);
  }



  render() {

    return (
      <div>
        <input type="text" 
        className="input search-bar" 
        name="search" 
        placeholder="search" 
        value={this.state.search}
        onChange={this.handleInput}
        />
        
      </div>
    )
  }
}

export default SearchBar;
