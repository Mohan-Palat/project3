import React, { Component } from 'react';
import Favorite from './Favorite'
import RestaurantItem from './RestaurantItem';
import {Route, Link } from 'react-router-dom';
import Nav from './Nav';
import { getReviewsByRestaurantID, getGeoCodeByLatLong } from './api';
import ReviewItem from './ReviewItem';

class RestaurantDetail extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: '',
            reviewBody: [],
            nearbyRestaurantList: [],
            toggleShowReviews: false,
            toggleShowNearbyRestaurants: false,
          }
    }

    componentDidMount() {
        console.log("RestaurantDetail.js componentDidMount executed");

        getReviewsByRestaurantID(this.props.restaurant.id)
            .then((response) => {
                // console.log('allReviews', response);
                this.setState({
                    reviewList: response.data.user_reviews,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });

        getGeoCodeByLatLong(this.props.restaurant.location.latitude, this.props.restaurant.location.longitude)
            .then((response) => {
                console.log('allNearbyRestaurants', response);
                this.setState({
                    nearbyRestaurantList: response.data.nearby_restaurants,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
    };

    getReviewsToggle = () => {
        let showReviewsValue;
        let showNearbyRestaurants;

        if (this.state.toggleShowReviews) {
            showReviewsValue = false;
            showNearbyRestaurants = this.state.toggleShowNearbyRestaurants
        }
        else {
            showReviewsValue = true;
            showNearbyRestaurants = false;
        }

        if (showReviewsValue) {
            getReviewsByRestaurantID(this.props.restaurant.id)
            .then((response) => {
                console.log('allReviews', response);
                this.setState({
                    reviewList: response.data.user_reviews,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
        }
        
        this.setState({
            toggleShowReviews: showReviewsValue,
            toggleShowNearbyRestaurants: showNearbyRestaurants,
        });
    }

    getNearbyRestaurantsToggle = () => {
        let showReviewsValue;
        let showNearbyRestaurants;

        if (this.state.toggleShowNearbyRestaurants) {
            showNearbyRestaurants = false;
            showReviewsValue = this.state.toggleShowReviews
        }
        else {
            showNearbyRestaurants = true;
            showReviewsValue = false;
        }

        if (showNearbyRestaurants) {
            getGeoCodeByLatLong(this.props.restaurant.location.latitude, this.props.restaurant.location.longitude)
            .then((response) => {
                console.log('allNearbyRestaurants', response);
                this.setState({
                    nearbyRestaurantList: response.data.nearby_restaurants,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
        }
        
        this.setState({
            toggleShowNearbyRestaurants: showNearbyRestaurants,
            toggleShowReviews: showReviewsValue
        });
    }
    isInFavorites = (restaurant) => {
        console.log('restaurant', restaurant)
        let isFave = false
        let faves = this.props.favoriteRestaurants;
        let myKeys = faves.filter(key => key.restaurant.id === restaurant.id);
        if (myKeys.length > 0){
          isFave = true
        }
        return isFave
      }
    render() {
        // console.log("this.props.restaurant", this.props);

        if (this.state.name != this.props.name) {
            this.setState({
                toggleShowReviews: false,
                toggleShowNearbyRestaurants: false,
                name: this.props.name,
                
            });
        }

        let allReviews = [];
        // console.log("this.state.reviewList", this.state.reviewList);

        if ((this.state.reviewList != null) && (this.state.toggleShowReviews)) {
            allReviews = this.state.reviewList.map((review, index) => {
                // console.log(index, "review", review);
                // console.log(index, "review.review.review_text", review.review.review_text);
                let indextemp = index + 1;
                return (
                <div class="card lighten-1">
                    <ReviewItem key={index} index={indextemp} review={review} />
                </div>)
            });
        }
        else {
            allReviews = <h3></h3>
        }

        let allNearbyRestaurants = [];
        // console.log("this.state.nearbyRestaurantList", this.state.nearbyRestaurantList);

        if ((this.state.nearbyRestaurantList != null) && (this.state.toggleShowNearbyRestaurants)) {
            allNearbyRestaurants = this.state.nearbyRestaurantList.map((nearbyRestaurant, index) => {
                // console.log(index, "nearbyRestaurant", nearbyRestaurant);
                // console.log(index, "nearbyRestaurant.restaurant", nearbyRestaurant.restaurant);
                let indextemp = index + 1;
                
                return (
                    <RestaurantItem key={index} 
                            restaurant={nearbyRestaurant.restaurant} 
                            isFave={this.props.favoriteRestaurants.includes(nearbyRestaurant)}
                            onFaveToggle={() => this.props.onFaveToggle(nearbyRestaurant)}
                            favoriteRestaurants={this.props.favoriteRestaurants}
                            handleRestaurantSearch={this.props.handleRestaurantSearch}
                    />)
            });
        }
        else {
            allNearbyRestaurants = <h3></h3>
        }

        const allHighlights = this.props.restaurant.highlights.map((highlight, index) => {        
            return (<li>- {highlight}</li>)
        });

        let priceRange = '';
        for (let i=0; i<this.props.restaurant.price_range; i++) {
            priceRange += this.props.restaurant.currency + ' ';
        }

        let googleString = `https://www.google.com/maps/embed/v1/search?key=AIzaSyCLbDPkMfZuxUVZ3L3-_fxsE6t3g86CaO8&q=${this.props.restaurant.name} allowfullscreen`
        // console.log('all props', this.props)
        return (
            <div>
                {/* <h1 className="Detail-Header">{this.props.name}</h1> */}
                {/* <Route path='/details' component={Nav} /> */}
                
                <div class="row">
                    <div class="col s24 m12 l7">
                        <div class="card lighten-1 display-card">
                            <div class="card-content black-text">
                                <span class="card-title display-name">{this.props.restaurant.name}</span>
                                {(this.props.restaurant.thumb)?<img border="0" src={this.props.restaurant.thumb} alt="name" className='display-thumb'/>:<img border="0" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png' alt="name" className='display-thumb-unavail'/>}
                            </div>
                            <div class="card-action" class={this.props.restaurant.user_rating.rating_text}>
                                <div>Aggregate Rating: {this.props.restaurant.user_rating.aggregate_rating}</div>
                                <div>Rating Text: {this.props.restaurant.user_rating.rating_text}</div>
                            </div>
                            <br/>
                            <div class="card-action" class="address">
                                <div>Address:</div>
                                <div>{this.props.restaurant.location.address}</div>
                                {(!this.props.restaurant.location.address.includes(this.props.restaurant.location.city))?<div>{this.props.restaurant.location.city}</div>:<div></div>}
                                <div>{this.props.restaurant.phone_numbers}</div>
                            </div>
                            <br/>
                            <div class="card-action" class="cuisines">
                                <div>Price Rating: {priceRange}</div>
                                <div>Average Cost for Two: {this.props.restaurant.currency}{this.props.restaurant.average_cost_for_two}</div>
                                <div>Cuisines: {this.props.restaurant.cuisines}</div>
                                <br/>
                            </div>
                            <div class="card-action" class="highlights">
                                <div>Highlights:</div>
                                <ul>
                                    {allHighlights}
                                </ul>
                                {/* <p>{this.props.restaurant.highlights.join().replace(/,/g,", ")}</p> */}
                            </div>
                            <br/>
                            <iframe
                                src={googleString}
                                >
                            </iframe>
                            <div class="card-action flex-container">
                                {(this.props.restaurant.menu_url)?<a class ="red-text" href={this.props.restaurant.menu_url} target="_blank">Restaurant Menu</a>:<h3></h3>}
                                {(this.props.restaurant.photos_url)?<a class ="red-text" href={this.props.restaurant.photos_url} target="_blank">Photos</a>:<h3></h3>}
                                {(this.props.restaurant.events_url)?<a class ="red-text" href={this.props.restaurant.events_url} target="_blank">Events</a>:<h3></h3>}
                            </div>
                            <div class="card-action flex-container">
                                <a class="waves-effect waves-light btn-large" onClick={this.getReviewsToggle}>{(this.state.toggleShowReviews)?"Hide Reviews":"Show Reviews"}</a>
                                <a class="waves-effect waves-light btn-large" onClick={this.getNearbyRestaurantsToggle}>{(this.state.toggleShowNearbyRestaurants)?"Hide Nearby Restaurants":"Show Nearby Restaurants"}</a>
                                <a class="waves-effect waves-light btn-large" onClick={this.props.closeRestaurantDetail}>Close</a>
                            </div>
                            <Favorite onFaveToggle={this.props.onFaveToggle} isFave={this.isInFavorites(this.props.restaurant)} favoriteRestaurants={this.props.favoriteRestaurants} />
                        </div>

                        {allReviews}
                    </div>
                </div>

                {allNearbyRestaurants}

            </div>
        );
    }
}

export default RestaurantDetail;
