import React from 'react';

export default function ReviewItem (props) { 
    
    // The exclamation point is removed from the rating text if it exists.
    // Any spaces are removed from the rating text.
    // This rating text value, rating, is used to correspond to the color in the CSS file.
    const rating = props.review.review.rating_text.replace(/!/,'').replace(/ /,'');
    return (
            <div class={rating}>
                <div class="card-action">
                    <h5>Comment #{props.index}</h5>
                </div>
                <div class="card-action">
                    <h6>Rating: {props.review.review.rating}</h6>
                    <h6>Rating Text: {props.review.review.rating_text}</h6>
                </div>
                <div class="card-action">
                    <h6>{props.review.review.review_text}</h6>
                    <h6>{props.review.review.review_time_friendly}</h6>
                    <h6>- {props.review.review.user.name}</h6>
                </div>
            </div>
        );
}