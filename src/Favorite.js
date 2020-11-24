import React, { Component } from 'react';

class Favorite extends Component {
    handleClick = (e) => {
        e.stopPropagation()
        this.props.onFaveToggle()
    }

    render() {
        const isFave = (this.props.isFave)
        if (isFave) {
            return (
                <div onClick={this.handleClick}>
                    <p>Remove from Favorites:</p>
                    <span id="favoritesBtn" class="btn indigo darken-4">
                        <i class="large material-icons">highlight_off</i>
                    </span>
                </div>
            )
        } else {
            return (
                <div onClick={this.handleClick}>
                    <p>Add to Favorites:</p>
                    <span id="favoritesBtn" class="btn red accent-3">
                        <i class="large material-icons">add_circle</i>
                    </span>
                </div>
            )
        }
    };
}

export default Favorite;