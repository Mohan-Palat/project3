import React from 'react';

export default function ReviewItem (props) { 
    // console.log("props", props);
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