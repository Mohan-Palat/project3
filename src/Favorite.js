import React, { Component } from 'react';

class Favorite extends Component {
    handleClick = (e) => {
        e.stopPropagation()
        console.log('Handling Fave click!')
        this.props.onFaveToggle()

    }
    render() {
        // const isFave = (this.props.isFave) ? 'remove_from_queue' : 'add_to_queue'
        const isFave = (this.props.isFave)
        if (isFave){
        return (
                <div onClick={this.handleClick}>
                remove from Favorites
              </div>
        )
            } else {
                return (
            <div onClick={this.handleClick}>
              Add to Favorites
            </div>
                )
            }

        };
    }

export default Favorite;