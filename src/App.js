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
      favoriteRestaurants: [],
    }
  }

  handleFaveToggle = (restaurant)=>{
    const faves = this.state.favoriteRestaurants.slice();
    const restaurantIndex = faves.indexOf(restaurant);
    console.log('favoriteRestaurants before', this.state.favoriteRestaurants)

    //If the restaurant is already in their favorites, take it out of the faves array.
    if (restaurantIndex >= 0) {
      console.log(`Removing ${restaurant.name} from faves`);
      faves.splice(restaurantIndex, 1);
    } 
    //If the restaurant is not in their favorites, add it to the faves array.
    if (restaurantIndex === -1){
      console.log(`Adding ${restaurant.name} to faves`);
      faves.push(restaurant);
    }
    this.setState({ 
      favoriteRestaurants: faves 
    })
    console.log('favoriteRestaurants after', this.state.favoriteRestaurants)
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
        restaurantComponent = <RestaurantList restaurantList={this.state.restaurantList} cityID={this.state.cityID} cityName={this.state.cityName} onFaveToggle={this.handleFaveToggle} />
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
        {restaurantComponent}
      </div>
    );
  }

}

export default App;
