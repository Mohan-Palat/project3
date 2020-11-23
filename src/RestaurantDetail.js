import React, { Component } from 'react';
import Favorite from './Favorite'
import RestaurantItem from './RestaurantItem';
import {Route, Link } from 'react-router-dom';
import Nav from './Nav';
import { getReviewsByRestaurantID } from './api';
import ReviewItem from './ReviewItem';

class RestaurantDetail extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: 'Ronnies',
            reviewBody: [],
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
    };

    render() {
        console.log("this.props.restaurant", this.props);

        let allReviews = [];
        // console.log("this.state.reviewList", this.state.reviewList);

        if (this.state.reviewList != null) {
            allReviews = this.state.reviewList.map((review, index) => {
                // console.log(index, "review", review);
                // console.log(index, "review.review.review_text", review.review.review_text);
                let indextemp = index + 1;
                return (
                <div class="card blue lighten-1">
                    <ReviewItem key={index} index={indextemp} review={review} />
                </div>)
            });
        }
        else {
            allReviews = <h3></h3>
        }

        let googleString = `https://www.google.com/maps/embed/v1/search?key=AIzaSyCLbDPkMfZuxUVZ3L3-_fxsE6t3g86CaO8&q=${this.props.restaurant.name} allowfullscreen`
        console.log('all props', this.props)
        return (
            <div>
                {/* <h1 className="Detail-Header">{this.props.name}</h1> */}
                {/* <Route path='/details' component={Nav} /> */}
                
                <div class="row">
                    <div class="col s24 m12 l7">
                        <div class="card blue lighten-1">
                            <div class="card-content black-text">
                                <span class="card-title">{this.props.restaurant.name}</span>
                                {(this.props.restaurant.thumb)?<img border="0" src={this.props.restaurant.thumb} alt="name"/>:<h3></h3>}
                            </div>
                            <div>{this.props.restaurant.location.address}</div>
                            {(!this.props.restaurant.location.address.includes(this.props.restaurant.location.city))?<div>{this.props.restaurant.location.city}</div>:<div></div>}
                            <div>{this.props.restaurant.phone_numbers}</div>
                            <br/>
                            <div class="card-action" class={this.props.restaurant.user_rating.rating_text}>
                                <div>Aggregate Rating: {this.props.restaurant.user_rating.aggregate_rating}</div>
                                <div>Rating Text: {this.props.restaurant.user_rating.rating_text}</div>
                            </div>
                            <br/>
                            <iframe
                                src={googleString}
                                >
                            </iframe>
                            <div class="card-action">
                                {(this.props.restaurant.menu_url)?<a class ="white-text" href={this.props.restaurant.menu_url} target="_blank">Restaurant Menu</a>:<h3></h3>}
                                {(this.props.restaurant.photos_url)?<a class ="white-text" href={this.props.restaurant.photos_url} target="_blank">Photos</a>:<h3></h3>}

                                <a class="waves-effect waves-light btn-large" onClick={this.props.closeRestaurantDetail}>Close</a>
                                <Favorite onFaveToggle={this.props.onFaveToggle} isFave={this.props.isFave} favoriteRestaurants={this.props.favoriteRestaurants} />
                            </div>
                        </div>

                        {allReviews}
                    </div>
                </div>

            </div>
        );
    }
}

export default RestaurantDetail;
