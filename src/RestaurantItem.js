import React from 'react';

export default function RestaurantItem (props) {
        return (
            <div>
                {/* <li>
                    <div>{props.restaurant.name}</div>
                    <div>{props.restaurant.user_rating.aggregate_rating}</div>
                    <div>{props.restaurant.user_rating.rating_text}</div>
                </li>
                <br></br> */}

                <div class="row">
                    <div class="col s12 m6">
                        <div class="card yellow lighten-1">
                            <div class="card-content black-text">
                                <span class="card-title">{props.restaurant.name}</span>
                                <div>{props.restaurant.user_rating.aggregate_rating}</div>
                                <div>{props.restaurant.user_rating.rating_text}</div>
                                {(props.restaurant.thumb)?<img border="0" src={props.restaurant.thumb} alt="name"/>:<h3></h3>}
                            </div>
                            <div class="card-action">
                                <a href="#">Restaurant Details</a>
                                <a href="#">This is a link</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
}
