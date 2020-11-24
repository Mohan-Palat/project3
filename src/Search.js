import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searchValue : '',
          categoryList: [],
        }
      }

    onTextBoxChange = (event) => {
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

        this.props.handleCitySearchCriteria(this.state.searchValue, false);
    }

    clearPanel = (event) => {
        event.preventDefault();

        this.props.handleCitySearchCriteria('');
        this.setState({
            searchValue: '',
        }); 
    }

    render() {

        if (this.props.currentCity != '') {
            this.state.searchValue = this.props.currentCity
        }


        return (
            <div>
                <div class="row search">
                    <div class="col s12 m6">
                        <div class="card search">
                            <div class="card-content black-text">
                                <form onSubmit={this.searchCity}>
                                    <input type = "text"
                                        id="inputCity"
                                        value = {this.state.searchValue}
                                        placeholder = "Enter City to Search Restaurants:"
                                        onChange = {this.onTextBoxChange}
                                    />
                                </form>
                                <div className='button-container'>
                                <a class="waves-effect waves-light btn-large" onClick={this.searchCity}>Search</a>
                                <a class="waves-effect waves-light btn-large" onClick={this.clearPanel}>Clear</a>
                                <a class="waves-effect waves-light btn-large" onClick={this.setRandom}>I'm Feeling Lucky</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>              
            </div>
        );
    }
}
export default Search;