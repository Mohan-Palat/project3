import React from 'react';

export default function CategoryItem (props) { 
    // console.log("props", props);  
    return (
            <>
                <label className="category-label" htmlFor={props.category.name} for={props.category.id}>
                    <input type="radio" onClick={props.handleCategoryResultList} name="group1" id={props.category.id} value={props.category.id} />
                    <span>{props.category.name}</span>
                </label>
            </>
        );
}