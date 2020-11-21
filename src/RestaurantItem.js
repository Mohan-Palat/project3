import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { getRestaurantByRestaurantID } from './api.js';


class RestaurantItem extends Component {



    render() {         
        
        const searchRestaurantDetails = (e) =>{
            e.preventDefault()
            const restaurantID = this.props.restaurant.id

            console.log(restaurantID);
            
            this.props.handleRestaurantSearch(this.props.restaurant.id)

    }
        return (
            <div>
                <li>
                    <div>{this.props.restaurant.name}</div>
                    <div>{this.props.restaurant.user_rating.aggregate_rating}</div>
                    <div>{this.props.restaurant.user_rating.rating_text}</div>
                    <button onClick={searchRestaurantDetails}>Details</button>
                </li>
                <br></br>
            </div>
        );
    }
}

export default RestaurantItem; 