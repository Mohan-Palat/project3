
import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { getRestaurantByRestaurantID } from './api.js';
import Favorite from './Favorite.js';


class RestaurantItem extends Component {
    
    render() {         
        console.log('RestaurantItem props', this.props)
        
        const searchRestaurantDetails = (e) =>{
            e.preventDefault()
            const restaurantID = this.props.restaurant.id
            console.log(restaurantID);
            
            this.props.handleRestaurantSearch(this.props.restaurant.id);

        }
        return (
            <div>
                <br></br>
                <div class="row flex-container">

                        <div class="card lighten-1 item-card">
                            <div class="card-content black-text center-details">
                                <span class="card-title">{this.props.restaurant.name}</span>
                                <div class="card-action" class="cuisines">
                                    <div>Cuisines: {this.props.restaurant.cuisines}</div>
                                </div>
                                <br/>
                                <div class="card-action" class={this.props.restaurant.user_rating.rating_text}>
                                    <div>Rating: {this.props.restaurant.user_rating.aggregate_rating}</div>
                                    <div>{this.props.restaurant.user_rating.rating_text}</div>
                                </div>
                                <br/>
                            </div>
                            {(this.props.restaurant.thumb)?<img border="0" src={this.props.restaurant.thumb} alt="name" className='display-thumb'/>:<img border="0" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png' alt="name" className='display-thumb-unavail'/>}
                            <div class="card-action display-links">
                                <a href="#">Restaurant Details</a>
                                <a href="#">This is a link</a>
                                <a class="waves-effect waves-light btn-large" onClick={searchRestaurantDetails} >Details</a>
                                <Favorite onFaveToggle={this.props.onFaveToggle} isFave={this.props.isFave} favoriteRestaurants={this.props.favoriteRestaurants} />
                            </div>
                        </div>

                </div>

            </div>
        );
    }   
}

export default RestaurantItem; 