import React from 'react';

export default function CuisineItem (props) { 
    // console.log("props", props);
    const id = "cuisine" + props.cuisine.cuisine_id;
    const name = "cuisine" + props.cuisine.cuisine_name;
    return (
            <>
                <label className="category-label" htmlFor={props.cuisine.cuisine_name} for={id}>
                    <input type="checkbox" onClick={props.handleCuisineResultList} name={name} id={id} value={props.cuisine.cuisine_id} />
                    <span>{props.cuisine.cuisine_name}</span>
                </label>
            </>
        );
}