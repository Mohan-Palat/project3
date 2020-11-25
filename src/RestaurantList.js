import React, { Component } from 'react';
import RestaurantItem from './RestaurantItem.js';

class RestaurantList extends Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
      }

      isInFavorites = (restaurant) => {
=======
    }
        
// compare the restaurant to the array of current favorites and toggle the favorite button accordingly
    isInFavorites = (restaurant) => {
>>>>>>> 9afaa40b65848be0b28dc74d536b47f00b2fb597
        let isFave = false
        let faves = this.props.favoriteRestaurants;
        let myKeys = faves.filter(key => key.restaurant.id === restaurant.restaurant.id);
        if (myKeys.length > 0) {
            isFave = true
        }
        return isFave
<<<<<<< HEAD
      }
      
=======
    }
>>>>>>> 9afaa40b65848be0b28dc74d536b47f00b2fb597
    render() {
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