import React, { Component } from 'react';
import Search from './Search';
import RestaurantList from './RestaurantList';
import { getCityID } from './api.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityID: '',
      cityName: '',
    }
  }

  
  render() {
    let restaurantComponent = '';
    if (this.state.cityID != '') {
      restaurantComponent = <RestaurantList cityID={this.state.cityID} cityName={this.state.cityName}/>
    }
    else {
      restaurantComponent = <h3>No Restaurants Listed</h3>
    }
    
    return (
      <div>
        <h1>Easy Pickins</h1>
        <h2>{this.state.cityName}</h2>
        <Search handleCitySearchCriteria={this.handleCitySearchCriteria}/>
        {restaurantComponent}
      </div>
    );
  }

  handleCitySearchCriteria = async (searchValue) => {
    console.log('Search value in App.js', searchValue);

    const results = await getCityID(searchValue);
    
    console.log(results.data.location_suggestions[0].id);

    this.setState({
      cityID: results.data.location_suggestions[0].id,
      cityName: results.data.location_suggestions[0].name,
    });

    console.log(results);
  }

}

export default App;
