import React, { Component } from 'react';
import Search from './Search';
import RestaurantList from './RestaurantList';
import { getCityID, getRestaurantsByCityID, getRestaurantsDetails } from './api.js';
import RestaurantDetail from './RestaurantDetail';
import RestaurantItem from './RestaurantItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityID: '',
      cityName: '',
      restaurantList: [],
      restaurantID: '',
      restaurantName: '',
    }
  }
  randRestaurant = (restrauntArr) => {
    return restrauntArr[Math.floor(Math.random() * restrauntArr.length)]
  }

  handleCitySearchCriteria = async (searchValue, isRandom) => {
    console.log('Search value in App.js', searchValue);
    // console.log('isRandom value in App.js', isRandom);
    const results = await getCityID(searchValue);
    
    console.log(results.data.location_suggestions[0].id);

    const restaurantResults = await getRestaurantsByCityID(results.data.location_suggestions[0].id);

    this.setState({
      cityID: results.data.location_suggestions[0].id,
      cityName: results.data.location_suggestions[0].name,
      restaurantList: restaurantResults.data.restaurants,
      isRandom: isRandom
    });

    console.log(results);
  }

  handleRestaurantSearch = async (restaurantID) =>{
    console.log("restaurant ID", restaurantID);
    // console.log('isRandom value in App.js', isRandom);
    const results = await getRestaurantsDetails(restaurantID);
    
    console.log(results);

    this.setState({
      restaurantID: restaurantID,
      restaurantBody: results.data.id,
      restaurantName: results.data.name,
    });

    console.log(results);

  }

  
  render() {
    console.log("App.js render");
    console.log("this.state", this.state);
    console.log("App.js props", this.props);

    let restaurantComponent = '';
    if (this.state.cityID !== '') {
      if (this.state.isRandom) {
        console.log('this.randRestaurant(this.state.restaurantList)', this.randRestaurant(this.state.restaurantList))
        // restaurantComponent = <RestaurantDetails restaurantList={this.randRestaurant(this.state.restaurantList)} cityID={this.state.cityID} cityName={this.state.cityName} />
      } else {
        restaurantComponent = <RestaurantList restaurantList={this.state.restaurantList} cityID={this.state.cityID} cityName={this.state.cityName} handleRestaurantSearch={this.handleRestaurantSearch}/>
      }
    }
    else {
      restaurantComponent = <h3>No Restaurants Listed</h3>
    }
    
    return (
      <div>
        <h1>Easy Pickins</h1>
        <h2>{this.state.cityName}</h2>
        <Search handleCitySearchCriteria={this.handleCitySearchCriteria}/>
        <RestaurantDetail name={this.state.restaurantName}/>
        {restaurantComponent}
      </div>
    );
  }

}

export default App;