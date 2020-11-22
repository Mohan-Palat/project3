import React, { Component } from 'react';
import Favorite from './Favorite'
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
        console.log("this.props.restaurant", this.props);

        return (
            <div>
                {/* <h1 className="Detail-Header">{this.props.name}</h1> */}
                {/* <Route path='/details' component={Nav} /> */}
                
                <div class="row s24 m12">
                    <div class="col s24 m12">
                        <div class="card cyan lighten-1">
                            <div class="card-content black-text">
                                <span class="card-title">{this.props.restaurant.name}</span>
                                {(this.props.restaurant.thumb)?<img border="0" src={this.props.restaurant.thumb} alt="name"/>:<h3></h3>}
                            </div>
                            <div>{this.props.restaurant.location.address}</div>
                            <div>{this.props.restaurant.phone_numbers}</div>
                            <div class="card-action">
                                <a href={this.props.restaurant.menu_url} target="_blank">Restaurant Menu</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default RestaurantDetail;
