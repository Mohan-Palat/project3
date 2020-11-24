import axios from 'axios'
//GET request using inputted city to get city
const getCityID = (city) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/cities?q=${city}`);
}
//GET request using city ID to get restaurant list
const getRestaurantsByCityID = (cityID) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/search?entity_id=${cityID}&entity_type=city`);
}
//GET request getting restaurant details using restaurant ID
const getRestaurantsDetails = (restaurantID) => {

  const instance = axios.create({
      baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
    });
    // Alter defaults after instance has been created
    instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

  return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/restaurant?res_id=${restaurantID}`);
}
//GET request getting a list of restaurants by using city ID and category
const getRestaurantsByCityIDAndCategories = (cityID, categoryList) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/search?entity_id=${cityID}&entity_type=city&category=${categoryList}&order=desc`);
}
//GET request to retrieve categories 
const getCategories = () => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/categories`);
}
//GET request to retrieve reviews by restaurant ID
const getReviewsByRestaurantID = (restaurantID) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/reviews?res_id=${restaurantID}`);
}
//GET request to retrieve restaurant list based on long and lat coordinates
const getGeoCodeByLatLong = (lat, lon) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/geocode?lat=${lat}&lon=${lon}`);
}
//GET request to retrieve cuisines in a specified city
const getCuisines = (cityID) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/cuisines?city_id=${cityID}`);
}
//GET request getting a list of restaurants by using city ID and cuisines
const getRestaurantsByCityIDAndCuisines = (cityID, cuisineList) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineList}&order=desc`);
}
//GET request getting a restaurant by city ID and filtering through category and cuisines 
const getRestaurantsByCityIDAndCategoriesAndCuisines = (cityID, categoryList, cuisineList) => {

  const instance = axios.create({
      baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
    });
    // Alter defaults after instance has been created
    instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

  return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/search?entity_id=${cityID}&entity_type=city&category=${categoryList}&cuisines=${cuisineList}&order=desc`);
}

export {getCityID, getRestaurantsByCityID, getCategories, getRestaurantsByCityIDAndCategories, 
    getRestaurantsDetails, getReviewsByRestaurantID, getGeoCodeByLatLong, getCuisines, 
    getRestaurantsByCityIDAndCuisines, getRestaurantsByCityIDAndCategoriesAndCuisines};
