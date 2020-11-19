import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searchValue : '',
        }
      }

    render() {
        return (
            <div>
                <form>
                    <input type = "text"
                        value = {this.state.searchValue}
                        placeholder = "Enter City:"
                        onChange = {this.onTextBoxChange}
                    />
                    <button onClick={this.searchCity}>Search</button>
                </form>
            </div>
        );
    }

    onTextBoxChange = (event) => {
        console.log('onTextBoxChange', event.target.value);

        this.setState({
            searchValue: event.target.value,
        });
    }

    searchCity = (event) => {
        event.preventDefault();
        console.log('searchCity', event.target.value);

        this.props.handleSearchCriteria(this.state.searchValue);
    }
}

export default Search;