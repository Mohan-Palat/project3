import React, { Component } from 'react';

class Favorite extends Component {
    handleClick = (e) => {
        e.stopPropagation()
        console.log('Handling Fave click!')

        // Add this line. You'll call the function passed through props
        this.props.onFaveToggle()

        // Delete the `setState` line. You no longer track state here
        // this.setState({isFave: !this.state.isFave})
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