import React, { Component } from 'react';
import Search from './Search';
import { getAllRestaurantsByCity } from './api.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>Easy Pickins</h1>
        <Search handleSearchCriteria={this.handleSearchCriteria}/>

      </div>
    );
  }

  handleSearchCriteria = async (searchValue) => {
    console.log('Search value in App.js', searchValue);

    const results = await getAllRestaurantsByCity(searchValue);

    console.log(results);
  }

}

export default App;
