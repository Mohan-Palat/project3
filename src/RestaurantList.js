import React, { Component } from 'react';
// import { getRestaurantsByCityID } from './api.js';
import RestaurantItem from './RestaurantItem.js';
// import Favorite from './Favorite'

class RestaurantList extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        // console.log("RestaurantList render this.props", this.props);
        ///////
        // console.log('Updated favorites this.state.favoriteRestaurants',this.state.favoriteRestaurants )
    
        const allRestaurants = this.props.restaurantList.map((entry, index) => {
            // console.log('restaurant list props', this.props);
            return <RestaurantItem  key={index} 
                                    restaurant={entry.restaurant} 
                                    isFave={this.props.favoriteRestaurants.includes(entry)}
                                    onFaveToggle={() => this.props.onFaveToggle(entry)}
                                    handleRestaurantSearch={this.props.handleRestaurantSearch}
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