import React, { Component } from 'react';
import { getRestaurantsByCityID } from './api.js';
import RestaurantItem from './RestaurantItem.js';

class RestaurantList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          restaurantList : [],
        }
      }

    componentDidMount() {
        this.handleRestaurantSearchCriteria(this.props.cityID)
            .then(() => {
                console.log('restaurantList', this.state.restaurantList);
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
    };

    render() {
        const restaurantList = this.state.restaurantList;

        const allRestaurants = restaurantList.map((entry, index) => {
            console.log(index, entry.restaurant.name);
            return <RestaurantItem key={index} restaurant={entry.restaurant} />
        });
        
        return (
            <ul>
                {allRestaurants}
            </ul>
        );
    }

    handleRestaurantSearchCriteria = async (event) => {
        console.log('Search value in Restaurant.js', this.props.cityID);

        const results = await getRestaurantsByCityID(this.props.cityID);
    
        console.log("results", results);
        // console.log("results.data.restaurants", results.data.restaurants);

        this.setState({
            restaurantList: results.data.restaurants,
        });
    }
}

export default RestaurantList;