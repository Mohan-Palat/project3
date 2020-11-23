
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
            
            this.props.handleRestaurantSearch(this.props.restaurant.id);

        }
        return (
            <div>
                <br></br>

                <div class="row">
                    <div class="col s12 m4">
                        <div class="card blue lighten-1">
                            <div class="card-content black-text">
                                <span class="card-title">{this.props.restaurant.name}</span>
                                <div class="card-action" class="cuisines">
                                    <div>Cuisines: {this.props.restaurant.cuisines}</div>
                                </div>
                                <br/>
                                <div class="card-action" class={this.props.restaurant.user_rating.rating_text}>
                                    <div>Aggregate Rating: {this.props.restaurant.user_rating.aggregate_rating}</div>
                                    <div>Rating Text: {this.props.restaurant.user_rating.rating_text}</div>
                                </div>
                                <br/>
                            </div>
                            {(this.props.restaurant.thumb)?<img border="0" src={this.props.restaurant.thumb} alt="name"/>:<h3></h3>}
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