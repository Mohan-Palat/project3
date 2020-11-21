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
        return (
            <div>
                <h1>{this.props.name}</h1>
                {/* <Route path='/details' component={Nav} /> */}
                
            </div>
        );
    }
}

export default RestaurantDetail;
