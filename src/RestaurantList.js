import React, { Component } from 'react';
// import { getRestaurantsByCityID } from './api.js';
import RestaurantItem from './RestaurantItem.js';
// import Favorite from './Favorite'

class RestaurantList extends Component {
    constructor(props) {
        super(props);
    }
    isInFavorites = (restaurant) => {
        let isFave = false
        let faves = this.props.favoriteRestaurants;
        let myKeys = faves.filter(key => key.restaurant.id === restaurant.restaurant.id);
        if (myKeys.length > 0) {
            isFave = true
        }
        return isFave
    }
    render() {
        // console.log("RestaurantList render this.props", this.props);
        ///////
        // console.log('Updated favorites this.state.favoriteRestaurants',this.state.favoriteRestaurants )

        const allRestaurants = this.props.restaurantList.map((entry, index) => {
            return <RestaurantItem key={index}
                restaurant={entry.restaurant}
                isFave={this.isInFavorites(entry)}
                onFaveToggle={() => this.props.onFaveToggle(entry)}
                handleRestaurantSearch={this.props.handleRestaurantSearch}
                favoriteRestaurants={this.props.favoriteRestaurants}
            />
        });
        return (
            <ul>
                {allRestaurants}
            </ul>
        );
    }
}

export default RestaurantList;