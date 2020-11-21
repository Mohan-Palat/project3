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
        return (
            <div onClick={this.handleClick}>
                "{isFave}"
                
            </div>
        );
    }
}

export default Favorite;