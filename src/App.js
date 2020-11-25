import React, { Component } from 'react';
import Search from './Search';
import RestaurantList from './RestaurantList';
import RestaurantDetail from './RestaurantDetail';
import Cuisine from './Cuisine';
import Category from './Category';
import { getGeoCodeByLatLong, getCityID, getRestaurantsByCityID, getRestaurantsByCityIDAndCategories,
  getRestaurantsDetails, getRestaurantsByCityIDAndCuisines, getRestaurantsByCityIDAndCategoriesAndCuisines} from './api.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityID: '',
      cityName: '',
      currentCity: '',
      restaurantList: [],
      favoriteRestaurants: [],
      categoryList: [],
      categoryResultValue: {},
      cuisineResultList: {},
      restaurantBody: null,
      restaurantID: '',
    }

  }

  viewMyFavorites = (event) => {
    event.preventDefault()
    this.handleCitySearchCriteria('viewFavorites', true);
  }

  handleFaveToggle = (restaurant) => {
    console.log('favorites', this.state.favoriteRestaurants)
    console.log('restaurant', restaurant)
    if (restaurant.hasOwnProperty('cuisines')) {
      let newRestaurant = { 'restaurant': restaurant }
      restaurant = newRestaurant
    }
    let faves = this.state.favoriteRestaurants;
    console.log('faves', faves)
    let myKeys = faves.filter(key => key.restaurant.id === restaurant.restaurant.id);
    console.log('mykeys', myKeys)
    if (myKeys.length > 0) {
      console.log('removing restaurant', restaurant.restaurant.name)
      faves = faves.filter(key => key.restaurant.id !== restaurant.restaurant.id);
    } else {
      console.log('adding restaurant', restaurant.restaurant.name)
      faves.push(restaurant);
    }
    this.setState({
      favoriteRestaurants: faves,
    })
  }


  randRestaurant = (restrauntArr) => {
    let randRest = restrauntArr[Math.floor(Math.random() * restrauntArr.length)].restaurant
    return randRest
  }

  handleRestaurantSearch = async (restaurantID) => {

    const results = await getRestaurantsDetails(restaurantID);

    this.setState({
      restaurantID: restaurantID,
      restaurantBody: results.data,
      restaurantName: results.data.name,
    });

    console.log("handleRestaurantSearch results", results);

  }

  handleCitySearchCriteria = async (searchValue, isRandom) => {
    console.log('Search value in App.js', searchValue);

    let restaurantResults = [];
    let cityID = '';
    let cityName = '';
    if (searchValue === 'viewFavorites') {
      console.log('state in handlecitySearchcriteria', this.state)
      restaurantResults = this.state.favoriteRestaurants;
      cityID = 1;
      cityName = 'My Favorites';
      isRandom = false
    } else {
      if (searchValue !== '') {
        const results = await getCityID(searchValue);
        const restaurantResultsOutput = await getRestaurantsByCityID(results.data.location_suggestions[0].id);
        restaurantResults = restaurantResultsOutput.data.restaurants;
        cityID = results.data.location_suggestions[0].id;
        cityName = results.data.location_suggestions[0].name;
      }
    }

    this.setState({
      cityID: cityID,
      cityName: cityName,
      restaurantList: restaurantResults,
      isRandom: isRandom,
      currentCity: '',
      cuisineResultList: {},
    });
  }

  // This function processes the event passed up from the category radio buttons
  // This function takes the current state of the category results and the
  // current list of the cuisines.
  // Based on whether a category is selected or the cuisine list is selected
  // this API determines which API to use to request a list of restaurants.
  // If only a category is selected, the getRestaurantsByCityIDAndCategories is used.
  // If both a category and list of cuisines are selected, 
  // the getRestaurantsByCityIDAndCategoriesAndCuisines function is used.
  handleCategoryResultList = async (event) => {

    // Get the current states of the category results value and the cusines list.
    let tempObjectCategoryResultsValue = this.state.categoryResultValue;
    let tempObjectCuisineResultsList = this.clone(this.state.cuisineResultList);

    // If the Category Results is zero, then the "None" category was selected.
    // If another category was selected, set the variable to this new selection.
    let restaurantResults = [];
    if (event.target.value === '0') {
      tempObjectCategoryResultsValue = '';
    }
    else {
      tempObjectCategoryResultsValue = event.target.value;
    }

    // If the cusine list is empty, we need to use the getRestaurantsByCityIDAndCategories() function.
    if (Object.keys(tempObjectCuisineResultsList) === {}) {
      let categoryKeyList = tempObjectCategoryResultsValue;

      const restaurantResultsOutput = await getRestaurantsByCityIDAndCategories(this.state.cityID, categoryKeyList);
      restaurantResults = restaurantResultsOutput.data.restaurants;
    }
    // If the cusine list is NOT empty, we need to use the getRestaurantsByCityIDAndCategoriesAndCuisines() function.
    else if (Object.keys(tempObjectCuisineResultsList) !== {}) {
      let cuisineKeyList = Object.keys(tempObjectCuisineResultsList).join();

      let categoryKeyList = tempObjectCategoryResultsValue;

      const restaurantResultsOutput = await getRestaurantsByCityIDAndCategoriesAndCuisines(this.state.cityID, categoryKeyList, cuisineKeyList);
      restaurantResults = restaurantResultsOutput.data.restaurants;
    }
    // Set the new states of the category and the returned list of restaurants.
    this.setState({
      categoryResultValue: tempObjectCategoryResultsValue,
      restaurantList: restaurantResults,
    });
  }

  // This function clones an existing object and returns a copy of that object.
  // This function is used to create a copy of an object.
  clone = (obj) => {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  // This function processes the event passed up from the cuisines checkbox list.
  // This function takes the current state of the category results and the
  // current list of the cuisines.
  // Based on whether a category is selected or the cuisine list is selected
  // this API determines which API to use to request a list of restaurants.
  // If only a category is selected, the getRestaurantsByCityIDAndCategories is used.
  // If both a category and list of cuisines are selected, 
  // the getRestaurantsByCityIDAndCategoriesAndCuisines function is used.
  handleCuisineResultList = async (event) => {

    // Get the current states of the category results value and the cusines list.
    let tempObjectCuisineResultsList = this.clone(this.state.cuisineResultList);
    let tempObjectCategoryResultsValue = this.state.categoryResultValue;

    // If the key is set to true, then the category was selected and should be unselected.
    // The key-value pair is removed from the object.
    // If the key does not exist, then the key is added and the value is set to true.
    let restaurantResults = [];
    if (tempObjectCuisineResultsList[event.target.value] === true) {
      delete tempObjectCuisineResultsList[event.target.value];
    }
    else {
      tempObjectCuisineResultsList[event.target.value] = true;
    }

    // If the cuisine list is NOT empty and the category is set to blank (i.e. Zero or "None"),
    // then use the getRestaurantsByCityIDAndCuisines function to get a list of matching restaurants.
    if ((Object.keys(tempObjectCuisineResultsList) !== {}) && (Object.keys(tempObjectCategoryResultsValue) === '')) {
      let cuisineKeyList = Object.keys(tempObjectCuisineResultsList).join();

      const restaurantResultsOutput = await getRestaurantsByCityIDAndCuisines(this.state.cityID, cuisineKeyList);
      restaurantResults = restaurantResultsOutput.data.restaurants;
    }
    // If the cuisine list is NOT empty and the category is NOT set to blank (i.e. Zero or "None"),
    // then use the getRestaurantsByCityIDAndCategoriesAndCuisines function to get a list of matching restaurants.
    else if ((Object.keys(tempObjectCuisineResultsList) !== {}) && (tempObjectCategoryResultsValue !== '')) {
      let cuisineKeyList = Object.keys(tempObjectCuisineResultsList).join();

      let categoryKeyList = tempObjectCategoryResultsValue;

      const restaurantResultsOutput = await getRestaurantsByCityIDAndCategoriesAndCuisines(this.state.cityID, categoryKeyList, cuisineKeyList);
      restaurantResults = restaurantResultsOutput.data.restaurants;
    }

    // Set the new states of the cuisine list and the returned list of restaurants.
    this.setState({
      cuisineResultList: tempObjectCuisineResultsList,
      restaurantList: restaurantResults,
    });
  }

  // If the user closes the Restaurant Detail card, then set the restaurant body to null.
  closeRestaurantDetail = (event) => {
    this.setState({
      restaurantBody: null,
    });
  }

  componentDidMount() {

    let currentComponent = this;

    navigator.geolocation.getCurrentPosition(function (position) {

      let userLat = position.coords.latitude
      let userLong = position.coords.longitude

      getGeoCodeByLatLong(userLat, userLong)
        .then((response) => {
          const userLocation = response.data.location.city_id;
          const userCity = response.data.location.city_name
          currentComponent.setState({
            cityID: userLocation,
            currentCity: userCity,
          });
        })
        .catch((error) => {
          console.log('API ERROR:', error);
        });
    });
  }

  searchForFave(restaurantBody) {
    var isFave = false;
    if (!restaurantBody.hasOwnProperty('cuisines')) {
      let newRestaurant = restaurantBody.restaurant
      restaurantBody = newRestaurant
    }
    for (var i = 0; i < this.state.favoriteRestaurants.length; i++) {
      if (this.state.favoriteRestaurants[i].restaurant.id === restaurantBody.id) {
        isFave = true;
        break;
      }
    }

    return isFave
  }

  render() {
    // If the City ID is NOT empty, then build a list of the restaurants.
    let restaurantComponent = '';
    if (this.state.cityID !== '') {
      if (this.state.isRandom) {
        const randRest = this.randRestaurant(this.state.restaurantList)
        restaurantComponent = <RestaurantDetail restaurant={randRest}
          cityID={this.state.cityID}
          cityName={this.state.cityName}
          favoriteRestaurants={this.state.favoriteRestaurants}
          onFaveToggle={() => this.handleFaveToggle(randRest)}
          isFave={this.searchForFave(randRest)}
        />
      } else {
        restaurantComponent = <RestaurantList restaurantList={this.state.restaurantList}
          cityID={this.state.cityID}
          cityName={this.state.cityName}
          favoriteRestaurants={this.state.favoriteRestaurants}
          handleRestaurantSearch={this.handleRestaurantSearch}
          onFaveToggle={this.handleFaveToggle}
        />
      }

      // If the restaurant body is NOT null, the
      if (this.state.restaurantBody != null) {
        restaurantComponent = <h3></h3>
      }

    }
    else {
      restaurantComponent = <h3 className="city-header">Search a City to View Restaurants!</h3>
    }

    let cuisine = '';
    let category = '';

    // If the city ID is not empty, then build the checkbox list of cuisines for the city.
    // Each cuisine list is different for each city.
    if (this.state.cityID !== '') {
      cuisine = <Cuisine cityID={this.state.cityID} handleCuisineResultList={this.handleCuisineResultList} />
    }
    else {
      cuisine = <h3></h3>;
    }

    // If the City ID is populated (i.e. not null), set the category panel.
    // Otherwise do not show the category panel.
    if (this.state.cityID !== '') {
      category = <Category cityID={this.state.cityID}
        handleCategoryResultList={this.handleCategoryResultList}
        handleCategorySearch={this.handleCategorySearch} />
    }
    else {
      category = <h3></h3>;
    }

    return (
      <>
        <div class="header">
          <h1 className='site-header'>Easy Pickin's</h1>
          <h3 className="subheader">Picking a restaurant, just got easy</h3>
          <Search handleCitySearchCriteria={this.handleCitySearchCriteria}
            handleCategorySearch={this.handleCategorySearch}
            categoryList={this.state.categoryList}
            handleCategoryResultList={this.handleCategoryResultList}
            currentCity={this.state.currentCity} />
          {category}
          {cuisine}
          {(this.state.cityName !== '') ? <h2 className="city-header">Viewing restaurants around {this.state.cityName}</h2> : <h2></h2>}
        </div>
        <a class="waves-effect waves-light btn-large" id="viewFavorites" onClick={this.viewMyFavorites}>View My Favorites</a>

        {(this.state.cityName !== '') ? <h2 className="city-header">Viewing restaurants in {this.state.cityName}</h2> : <h2></h2>}

        {(this.state.restaurantBody != null) ? <RestaurantDetail key={this.state.restaurantID}
          name={this.state.restaurantName}
          restaurant={this.state.restaurantBody}
          closeRestaurantDetail={this.closeRestaurantDetail}
          favoriteRestaurants={this.state.favoriteRestaurants}
          onFaveToggle={() => this.handleFaveToggle(this.state.restaurantBody)}
          isFave={this.searchForFave(this.state.restaurantBody)}
          handleRestaurantSearch={this.handleRestaurantSearch}
        />
          : <h3></h3>}
        {restaurantComponent}
      </>
    );
  }
}


export default App;