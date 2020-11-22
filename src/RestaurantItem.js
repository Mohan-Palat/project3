
import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { getRestaurantByRestaurantID } from './api.js';
import Favorite from './Favorite.js';


class RestaurantItem extends Component {

    
    render() {         
        // console.log('RestaurantItem props', this.props)
        
        const searchRestaurantDetails = (e) =>{
            e.preventDefault()
            const restaurantID = this.props.restaurant.id

            console.log(restaurantID);
            
            this.props.handleRestaurantSearch(this.props.restaurant.id)

    }
        return (
            <div>
                <br></br>

                <div class="row">
                    <div class="col s12 m6">
                        <div class="card yellow lighten-1 list-card">
                            <div class="card-content black-text">
                                <span class="card-title">{this.props.restaurant.name}</span>
                                <div>{this.props.restaurant.user_rating.aggregate_rating}</div>
                                <div>{this.props.restaurant.user_rating.rating_text}</div>
                                {(this.props.restaurant.thumb)?<img border="0" src={this.props.restaurant.thumb} alt="name"/>:<h3></h3>}
                            </div>
                            <div class="card-action">
                                <a href="#">Restaurant Details</a>
                                <a href="#">This is a link</a>
                                {/* <button onClick={searchRestaurantDetails}>Details</button> */}
                                <a class="waves-effect waves-light btn-large" onClick={searchRestaurantDetails}>Details</a>
                                <Favorite onFaveToggle={this.props.onFaveToggle} isFave={this.props.isFave}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }   
}

export default RestaurantItem; 