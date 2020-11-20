import React, { Component } from 'react';

class RestaurantItem extends Component {
    render() {
        return (
            <div>
                <li>
                    <div>{this.props.restaurant.name}</div>
                    <div>{this.props.restaurant.user_rating.aggregate_rating}</div>
                    <div>{this.props.restaurant.user_rating.rating_text}</div>
                </li>
                <br></br>
            </div>
        );
    }
}

export default RestaurantItem;