import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searchValue : '',
          categoryList: [],
        }
      }

    // The Search Value gets updated as the user types in the field.
    onTextBoxChange = (event) => {
        this.setState({
            searchValue: event.target.value,
        });
    }
<<<<<<< HEAD
 
=======
    // event for the 'i'm feeling lucky' button, sets isRandom flag to true
>>>>>>> 9afaa40b65848be0b28dc74d536b47f00b2fb597
    setRandom = (event) => {
        event.preventDefault();
        this.props.handleCitySearchCriteria(this.state.searchValue, true);
    }

    // This function is passed from App.js and is used to search for a city
    // based on the value in the state.searchValue field (i.e. entered by user)
    searchCity = (event) => {
        event.preventDefault();
        this.props.handleCitySearchCriteria(this.state.searchValue, false);
    }

    // The clear panel button sets the value of the search value to null.
    clearPanel = (event) => {
        event.preventDefault();
        this.props.handleCitySearchCriteria('');
        this.setState({
            searchValue: '',
        }); 
    }

    render() {
        //update search box to user's location when they first get to page
        if (this.props.currentCity != '') {
            this.state.searchValue = this.props.currentCity
        }
<<<<<<< HEAD

=======
>>>>>>> 9afaa40b65848be0b28dc74d536b47f00b2fb597
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