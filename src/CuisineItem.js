import React, { Component } from 'react';

class CuisineItem extends Component {
    render () {

        const id = "cuisine" + this.props.cuisine.cuisine_id;
        const name = "cuisine" + this.props.cuisine.cuisine_name;

        const ref = 'ref_' + this.props.cuisine.cuisine_id;
        if (this.props.changeCityFlag) {
            this.refs['ref_' + id].checked = false;
        }

        return (
                <>
                    <label className="category-label" htmlFor={this.props.cuisine.cuisine_name} for={id}>
                        <input type="checkbox" onClick={this.props.handleCuisineResultList} name={name} id={id} value={this.props.cuisine.cuisine_id} ref={'ref_' + id}/>
                        <span>{this.props.cuisine.cuisine_name}</span>
                    </label>
                </>
        );
    }
}

export default CuisineItem;