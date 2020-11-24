
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
                                <div>{this.props.restaurant.location.city}, {this.props.restaurant.location.zipcode}</div>
                                <br/>
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
                                {(this.props.restaurant.menu_url)?<a class ="black-text" href={this.props.restaurant.menu_url} target="_blank">Restaurant Menu</a>:<h3></h3>}
                                {(this.props.restaurant.photos_url)?<a class ="black-text" href={this.props.restaurant.photos_url} target="_blank">Photos</a>:<h3></h3>}
                                {(this.props.restaurant.events_url)?<a class ="black-text" href={this.props.restaurant.events_url} target="_blank">Events</a>:<h3></h3>}
                                <a class="waves-effect waves-light btn-large" onClick={searchRestaurantDetails}>Details</a>
                                {/* <button onClick={searchRestaurantDetails}>Details</button> */}
                                
                                <Favorite onFaveToggle={this.props.onFaveToggle} isFave={this.props.isFave} favoriteRestaurants={this.props.favoriteRestaurants} />
                            </div>
                        </div>

                </div>

            </div>
        );
    }   
}

export default RestaurantItem; 