import React, { Component } from 'react';
import Search from './Search';
import RestaurantList from './RestaurantList';
import { getCityID, getRestaurantsByCityID, getCategories, getRestaurantsByCityIDAndCategories } from './api.js';
 
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityID: '',
      cityName: '',
      restaurantList: [],
      categoryList: [],
      categoryResultList: {},
    }
  }
  randRestaurant = (restrauntArr) => {
    return restrauntArr[Math.floor(Math.random() * restrauntArr.length)]
  }

  handleCategorySearch = async () => {
    console.log('handleCategorySearch');

    const results = await getCategories();
    
    console.log("results.data.categories", results.data.categories);
    const categories = results.data.categories;

    this.setState({
      categoryList: categories,
    });
  }

  handleCitySearchCriteria = async (searchValue, isRandom) => {
    console.log('Search value in App.js', searchValue);

    let restaurantResults = [];
    let cityID = '';
    let cityName = '';

    if (searchValue != '') {
      const results = await getCityID(searchValue);
      console.log(results.data.location_suggestions[0].id);

      if (Object.keys(this.state.categoryResultList) == null) {
        const restaurantResultsOutput = await getRestaurantsByCityID(results.data.location_suggestions[0].id);
        restaurantResults = restaurantResultsOutput.data.restaurants;
        cityID = results.data.location_suggestions[0].id;
        cityName = results.data.location_suggestions[0].name;
      }
      else {
        let keylist = Object.keys(this.state.categoryResultList).join();
        console.log("keylist", keylist);

        const restaurantResultsOutput = await getRestaurantsByCityIDAndCategories(results.data.location_suggestions[0].id, keylist);
        restaurantResults = restaurantResultsOutput.data.restaurants;
        cityID = results.data.location_suggestions[0].id;
        cityName = results.data.location_suggestions[0].name;
      }

    }

    this.setState({
      cityID: cityID,
      cityName: cityName,
      restaurantList: restaurantResults,
      isRandom: isRandom
    });
  }

  handleCategoryResultList = (event) => {
    console.log('handleCategoryResultList', event.target); 
    console.log('handleCategoryResultList id', event.target.id);

    let tempObject = this.state.categoryResultList;

    if (tempObject[event.target.id] == true) {
      delete tempObject[event.target.id];
    }
    else {
      tempObject[event.target.id] = true;
    }

    this.setState({
      categoryResultList: tempObject
    });

    console.log("tempObject", tempObject);
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
        restaurantComponent = <RestaurantList restaurantList={this.state.restaurantList} cityID={this.state.cityID} cityName={this.state.cityName} />
      }
    }
    else {
      restaurantComponent = <h3>No Restaurants Listed</h3>
    }
    
    return (
      <>
      <div class="header">
        <h1>Easy Pickins</h1>
        {/* <h2>{this.state.cityName}</h2> */}
        <Search handleCitySearchCriteria={this.handleCitySearchCriteria} handleCategorySearch={this.handleCategorySearch} 
          categoryList={this.state.categoryList} handleCategoryResultList={this.handleCategoryResultList}/>
      </div>
      <h3>{this.state.cityName}</h3>
      {restaurantComponent}
      </>
    );
  }

}

export default App;
