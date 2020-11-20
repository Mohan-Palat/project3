import React, { Component } from 'react';
import Search from './Search';
import RestaurantList from './RestaurantList';
import { getCityID, getRestaurantsByCityID } from './api.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityID: '',
      cityName: '',
      restaurantList: [],
    }
  }

  handleCitySearchCriteria = async (searchValue) => {
    console.log('Search value in App.js', searchValue);

    const results = await getCityID(searchValue);
    
    console.log(results.data.location_suggestions[0].id);

    const restaurantResults = await getRestaurantsByCityID(results.data.location_suggestions[0].id);

    this.setState({
      cityID: results.data.location_suggestions[0].id,
      cityName: results.data.location_suggestions[0].name,
      restaurantList: restaurantResults.data.restaurants,
    });

    console.log(results);
  }

  
  render() {
    console.log("App.js render");
    console.log("this.state", this.state);

    let restaurantComponent = '';
    if (this.state.cityID != '') {
      restaurantComponent = <RestaurantList restaurantList={this.state.restaurantList} cityID={this.state.cityID} cityName={this.state.cityName}/>
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

}

export default App;
