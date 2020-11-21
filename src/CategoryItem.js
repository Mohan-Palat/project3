import React from 'react';

export default function CategoryItem (props) { 
    // console.log("props", props);  
    return (
            <>
                <label className="category-label" htmlFor={props.category.name} for={props.category.id}>
                    <input type="checkbox" onClick={props.handleCategoryResultList} name={props.category.name} id={props.category.id} value={props.category.id} />
                    <span>{props.category.name}</span>
                </label>
                <br/>
            </>
        );
}