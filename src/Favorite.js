import React, { Component } from 'react';

class Favorite extends Component {
    handleClick = (e) => {
        e.stopPropagation()
        console.log('Handling Fave click!', this.props)
        this.props.onFaveToggle()

    }
    render() {
        // const isFave = (this.props.isFave) ? 'remove_from_queue' : 'add_to_queue'
        const isFave = (this.props.isFave)
        if (isFave) {
            return (
                <div onClick={this.handleClick}>
                <p>My Favorites:</p> 
                    <span class="btn deep-orange accent-3">Remove</span>
                </div>
            )
        } else {
            return (
            <div onClick={this.handleClick}>
            <p>My Favorites:</p> 
                <span class="btn light-blue lighten-2">Add</span>
            </div>
            )
        }

    };
}

export default Favorite;