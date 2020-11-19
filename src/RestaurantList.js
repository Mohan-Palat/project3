import React, { Component } from 'react';
import { getRestaurantsByCityID } from './api.js';

class RestaurantList extends Component {
    render() {
        let restaurantList = this.handleRestaurantSearchCriteria(this.props.cityID);
        console.log("restaurantList line 7", restaurantList);

        for (let i=0; i<restaurantList.length; i++) {
            console.log("for loop: " + i, restaurantList[i].restaurant.name);
        }
        // let allRestaurants = restaurantList.map((entry, index) => {
        //     console.log(index, entry.restaurant.name);
        //     // return <Restaurant key={index}/>
        // });
        
        return (
            <div>
                <h3>RestaurantList</h3>
                {/* {allRestaurants} */}
            </div>
        );
    }

    handleRestaurantSearchCriteria = async (event) => {
        console.log('Search value in Restaurant.js', this.props.cityID);

        const results = await getRestaurantsByCityID(this.props.cityID);
    
        console.log("results", results);
        console.log("results.data.restaurants", results.data.restaurants);

        return results.data.restaurants;
    }
}

export default RestaurantList;