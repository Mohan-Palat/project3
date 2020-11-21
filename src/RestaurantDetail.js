import React, { Component } from 'react';
import RestaurantItem from './RestaurantItem';
import {Route, Link } from 'react-router-dom';
import Nav from './Nav';


class RestaurantDetail extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: 'Ronnies',
          }
    }


    render() {
        console.log("this.props.restaurant", this.props.restaurant);

        return (
            <div>
                {/* <h1 className="Detail-Header">{this.props.name}</h1> */}
                {/* <Route path='/details' component={Nav} /> */}
                
                <div class="row">
                    <div class="col s12 m6 l4">
                        <div class="card cyan lighten-1">
                            <div class="card-content black-text">
                                <span class="card-title">{this.props.restaurant.name}</span>
                                {(this.props.restaurant.thumb)?<img border="0" src={this.props.restaurant.thumb} alt="name"/>:<h3></h3>}
                            </div>
                            <div>{this.props.restaurant.location.address}</div>
                            {(!this.props.restaurant.location.address.includes(this.props.restaurant.location.city))?<div>{this.props.restaurant.location.city}</div>:<div></div>}
                            {/* <div>{this.props.restaurant.location.city}</div> */}
                            <div>{this.props.restaurant.phone_numbers}</div>
                            <div class="card-action" class={this.props.restaurant.user_rating.rating_text}>
                                <div>Aggregate Rating: {this.props.restaurant.user_rating.aggregate_rating}</div>
                                <div>Rating Text: {this.props.restaurant.user_rating.rating_text}</div>
                            </div>
                            <div class="card-action">
                                {(this.props.restaurant.menu_url)?<a class ="white-text" href={this.props.restaurant.menu_url} target="_blank">Restaurant Menu</a>:<h3></h3>}
                                {(this.props.restaurant.photos_url)?<a class ="white-text" href={this.props.restaurant.photos_url} target="_blank">Photos</a>:<h3></h3>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default RestaurantDetail;
