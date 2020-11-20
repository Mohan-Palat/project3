import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searchValue : '',
        }
      }

    onTextBoxChange = (event) => {
        console.log('onTextBoxChange', event.target.value);

        this.setState({
            searchValue: event.target.value,
        });
    }
    setRandom = (event) => {
        event.preventDefault();
        this.props.handleCitySearchCriteria(this.state.searchValue, true);
    }
    searchCity = (event) => {
        event.preventDefault();
        console.log('searchCity', event.target.value);

        this.props.handleCitySearchCriteria(this.state.searchValue, false);

        this.setState({
            searchValue: '',
        }); 
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
                    <button onClick={this.setRandom}>I'm Feeling Lucky</button>
                </form>
            </div>
        );
    }
}

export default Search;