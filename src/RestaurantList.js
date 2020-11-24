import React, { Component } from 'react';
import RestaurantItem from './RestaurantItem.js';

class RestaurantList extends Component {
    constructor(props) {
        super(props);
      }
      isInFavorites = (restaurant) => {
        let isFave = false
        let faves = this.props.favoriteRestaurants;
        let myKeys = faves.filter(key => key.restaurant.id === restaurant.restaurant.id);
        if (myKeys.length > 0){
          isFave = true
        }
        return isFave
      }
    render() {
        const allRestaurants = this.props.restaurantList.map((entry, index) => {
                return <RestaurantItem  key={index} 
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