import axios from 'axios'

const getCityID = (city) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/cities?q=${city}`);
}

const getRestaurantsByCityID = (cityID) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/search?entity_id=${cityID}&entity_type=city`);
}

const getRestaurantsDetails = (restaurantID) => {

  const instance = axios.create({
      baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
    });
    // Alter defaults after instance has been created
    instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

  return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/restaurant?res_id=${restaurantID}`);
}

const getRestaurantsByCityIDAndCategories = (cityID, categoryList) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/search?entity_id=${cityID}&entity_type=city&category=${categoryList}&order=desc`);
}

const getCategories = () => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/categories`);
}

const getReviewsByRestaurantID = (restaurantID) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/reviews?res_id=${restaurantID}`);
}

const getGeoCodeByLatLong = (lat, lon) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/geocode?lat=${lat}&lon=${lon}`);
}

const getCuisines = (cityID) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/cuisines?city_id=${cityID}`);
}

const getRestaurantsByCityIDAndCuisines = (cityID, cuisineList) => {

    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_ZOMATO_BASE_URL}`
      });
      // Alter defaults after instance has been created
      instance.defaults.headers.common['user-key'] = `${process.env.REACT_APP_ZOMATO_API_KEY}`;

    return instance.get(`${process.env.REACT_APP_ZOMATO_BASE_URL}/search?entity_id=${cityID}&entity_type=city&cuisines=${cuisineList}&order=desc`);
}

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
