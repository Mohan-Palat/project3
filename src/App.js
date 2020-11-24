import React, { Component } from 'react';
import Search from './Search';
import RestaurantList from './RestaurantList';
import RestaurantDetail from './RestaurantDetail';
import RestaurantItem from './RestaurantItem';
import Cuisine from './Cuisine';
import Category from './Category';
import {
  getGeoCodeByLatLong, getCityID, getRestaurantsByCityID, getCategories,
  getRestaurantsByCityIDAndCategories, getRestaurantsDetails,
  getRestaurantsByCityIDAndCuisines, getRestaurantsByCityIDAndCategoriesAndCuisines
} from './api.js';

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
    //this.delta = this.delta.bind(this);
    this.getGeoCodeByLatLong = getGeoCodeByLatLong.bind(this)

  }

  viewMyFavorites = (event) => {
    event.preventDefault()
    // console.log(event)
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
    // console.log('randRestaurant',restrauntArr[Math.floor(Math.random() * restrauntArr.length)].restaurant )
    // return restrauntArr[Math.floor(Math.random() * restrauntArr.length)].restaurant
    let randRest = restrauntArr[Math.floor(Math.random() * restrauntArr.length)].restaurant
    // this.setState({
    //   randRestaurant: randRest,
    // })
    return randRest
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

  handleRestaurantSearch = async (restaurantID) => {
    console.log("restaurant ID", restaurantID);
    // console.log('isRandom value in App.js', isRandom);
    const results = await getRestaurantsDetails(restaurantID);

    console.log(results);

    this.setState({
      restaurantID: restaurantID,
      restaurantBody: results.data,
      restaurantName: results.data.name,
      // restaurantFave: {"restaurant": results.data}
    });

    console.log("handleRestaurantSearch results", results);

  }

  // handleCategorySearch = async () => {
  //   console.log('handleCategorySearch');

  //   const results = await getCategories();

  //   console.log("results.data.categories", results.data.categories);
  //   let categories = results.data.categories;

  //   this.setState({
  //     categoryList: categories,
  //   });
  // }

  handleCitySearchCriteria = async (searchValue, isRandom) => {
    console.log('Search value in App.js', searchValue);

    let restaurantResults = [];
    let cityID = '';
    let cityName = '';
    if (searchValue == 'viewFavorites') {
      console.log('state in handlecitySearchcriteria', this.state)
      restaurantResults = this.state.favoriteRestaurants;
      cityID = 1;
      cityName = 'My Favorites';
      isRandom = false
    } else {
      if (searchValue !== '') {
        const results = await getCityID(searchValue);
        console.log(results.data.location_suggestions[0].id);

        // if (Object.keys(this.state.categoryResultList) == null) {
        const restaurantResultsOutput = await getRestaurantsByCityID(results.data.location_suggestions[0].id);
        restaurantResults = restaurantResultsOutput.data.restaurants;
        cityID = results.data.location_suggestions[0].id;
        cityName = results.data.location_suggestions[0].name;
        // }
        // else {
        //   let keylist = Object.keys(this.state.categoryResultList).join();
        //   console.log("keylist", keylist);

        //   const restaurantResultsOutput = await getRestaurantsByCityIDAndCategories(results.data.location_suggestions[0].id, keylist);
        //   restaurantResults = restaurantResultsOutput.data.restaurants;
        //   cityID = results.data.location_suggestions[0].id;
        //   cityName = results.data.location_suggestions[0].name;
        // }

      }
    }

    this.setState({
      cityID: cityID,
      cityName: cityName,
      restaurantList: restaurantResults,
      isRandom: isRandom,
      currentCity: '',
      cuisineResultList: {},
      isRandom: isRandom,
    });
  }

  // handleCategoryResultList = (event) => {
  //   console.log('handleCategoryResultList', event.target); 
  //   console.log('handleCategoryResultList id', event.target.id);

  //   let tempObject = this.state.categoryResultList;

  //   if (tempObject[event.target.id] == true) {
  //     delete tempObject[event.target.id];
  //   }
  //   else {
  //     tempObject[event.target.id] = true;
  //   }

  //   this.setState({
  //     categoryResultList: tempObject
  //   });

  //   console.log("tempObject", tempObject);
  // }

  handleCategoryResultList = async (event) => {
    console.log('handleCuisineResultList event', event);

    // let tempObjectCuisineResultsList = this.state.cuisineResultList;
    let tempObjectCategoryResultsValue = this.state.categoryResultValue;
    let tempObjectCuisineResultsList = this.clone(this.state.cuisineResultList);

    console.log("tempObjectCategoryResultsValue handleCategoryResultList", tempObjectCategoryResultsValue);
    console.log("tempObjectCuisineResultsList handleCategoryResultList", tempObjectCuisineResultsList);

    let restaurantResults = [];
    if (event.target.value == '0') {
      tempObjectCategoryResultsValue = '';
    }
    else {
      tempObjectCategoryResultsValue = event.target.value;
    }

    if (Object.keys(tempObjectCuisineResultsList) == {}) {
      let categoryKeyList = tempObjectCategoryResultsValue;
      console.log("categoryKeyList single", categoryKeyList);

      const restaurantResultsOutput = await getRestaurantsByCityIDAndCategories(this.state.cityID, categoryKeyList);
      restaurantResults = restaurantResultsOutput.data.restaurants;
    }
    else if (Object.keys(tempObjectCuisineResultsList) != {}) {
      let cuisineKeyList = Object.keys(tempObjectCuisineResultsList).join();
      console.log("cuisineKeyList double", cuisineKeyList);

      let categoryKeyList = tempObjectCategoryResultsValue;
      console.log("categoryKeyList double", categoryKeyList);

      const restaurantResultsOutput = await getRestaurantsByCityIDAndCategoriesAndCuisines(this.state.cityID, categoryKeyList, cuisineKeyList);
      restaurantResults = restaurantResultsOutput.data.restaurants;
    }

    console.log("restaurantResults", restaurantResults);

    this.setState({
      categoryResultValue: tempObjectCategoryResultsValue,
      restaurantList: restaurantResults,
    });

    console.log("tempObjectCategoryResultsValue", tempObjectCategoryResultsValue);
  }

  clone = (obj) => {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  handleCuisineResultList = async (event) => {
    console.log('handleCuisineResultList event', event);

    // let tempObjectCuisineResultsList = this.state.cuisineResultList;
    let tempObjectCuisineResultsList = this.clone(this.state.cuisineResultList);
    let tempObjectCategoryResultsValue = this.state.categoryResultValue;

    let restaurantResults = [];
    if (tempObjectCuisineResultsList[event.target.value] == true) {
      delete tempObjectCuisineResultsList[event.target.value];
    }
    else {
      tempObjectCuisineResultsList[event.target.value] = true;
    }

    if ((Object.keys(tempObjectCuisineResultsList) != {}) && (Object.keys(tempObjectCategoryResultsValue) == '')) {
      let cuisineKeyList = Object.keys(tempObjectCuisineResultsList).join();
      console.log("cuisineKeyList", cuisineKeyList);

      const restaurantResultsOutput = await getRestaurantsByCityIDAndCuisines(this.state.cityID, cuisineKeyList);
      restaurantResults = restaurantResultsOutput.data.restaurants;
    }
    else if ((Object.keys(tempObjectCuisineResultsList) != {}) && (tempObjectCategoryResultsValue != '')) {
      let cuisineKeyList = Object.keys(tempObjectCuisineResultsList).join();
      console.log("cuisineKeyList", cuisineKeyList);

      let categoryKeyList = tempObjectCategoryResultsValue;
      console.log("categoryKeyList", categoryKeyList);

      const restaurantResultsOutput = await getRestaurantsByCityIDAndCategoriesAndCuisines(this.state.cityID, categoryKeyList, cuisineKeyList);
      restaurantResults = restaurantResultsOutput.data.restaurants;
    }

    console.log("restaurantResults", restaurantResults);

    this.setState({
      cuisineResultList: tempObjectCuisineResultsList,
      restaurantList: restaurantResults,
    });

    console.log("tempObjectCuisineResultsList", tempObjectCuisineResultsList);
  }


  closeRestaurantDetail = (event) => {
    console.log('handleCategoryResultList props', this.props);
    console.log('handleCategoryResultList state', this.state);

    this.setState({
      restaurantBody: null,
    });
  }

  componentDidMount() {


    let currentComponent = this;

    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      let userLat = position.coords.latitude
      let userLong = position.coords.longitude

      console.log(this);

      getGeoCodeByLatLong(userLat, userLong)
        .then((response) => {
          console.log('my location is', response.data.location.city_id, response.data.location.city_name);

          const userLocation = response.data.location.city_id;
          const userCity = response.data.location.city_name


          console.log(currentComponent);
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
      if (this.state.favoriteRestaurants[i].restaurant.id == restaurantBody.id) {
        isFave = true;
        break;
      }
    }

    return isFave
  }



  render() {
    console.log("App.js render");
    console.log("this.state", this.state);
    // console.log("App.js props", this.props);

    let restaurantComponent = '';
    if (this.state.cityID !== '') {
      if (this.state.isRandom) {
        // console.log('this.randRestaurant(this.state.restaurantList)', this.randRestaurant(this.state.restaurantList))
        const randRest = this.randRestaurant(this.state.restaurantList)
        restaurantComponent = <RestaurantDetail restaurant={randRest}
          // restaurant={this.randRestaurant(this.state.restaurantList)} 
          cityID={this.state.cityID}
          cityName={this.state.cityName}
          favoriteRestaurants={this.state.favoriteRestaurants}
          // onFaveToggle={this.handleFaveToggle}
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
        // isFave={this.findInFave}
        />
      }

      if (this.state.restaurantBody != null) {
        restaurantComponent = <h3></h3>
      }

    }
    else {
      restaurantComponent = <h3 className="city-header">Search a City to View Restaurants!</h3>
    }

    let cuisine = '';
    let category = '';
    console.log('App.js this.state.cityID', this.state.cityID);

    if (this.state.cityID != '') {
      cuisine = <Cuisine cityID={this.state.cityID} handleCuisineResultList={this.handleCuisineResultList} />
    }
    else {
      cuisine = <h3></h3>;
    }

    if (this.state.cityID != '') {
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
          {(this.state.cityName != '') ? <h2 className="city-header">Viewing restaurants around {this.state.cityName}</h2> : <h2></h2>}
        </div>
        <a class="waves-effect waves-light btn-large" id="viewFavorites" onClick={this.viewMyFavorites}>View My Favorites</a>

        {(this.state.cityName != '') ? <h2 className="city-header">Viewing restaurants in {this.state.cityName}</h2> : <h2></h2>}

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