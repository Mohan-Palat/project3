import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import { getCategories } from './api.js';

class Search extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searchValue : '',
          categoryList: [],
        }
      }
    viewMyFavorites = (event) => {
        event.preventDefault()
        console.log(event)
        this.props.handleCitySearchCriteria('viewFavorites', true);
    }
    onTextBoxChange = (event) => {
        // console.log('onTextBoxChange', event.target.value);

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

    clearPanel = (event) => {
        event.preventDefault();
        console.log('clearPanel', event.target.value);

        this.props.handleCitySearchCriteria('');

        this.setState({
            searchValue: '',
        }); 
    }

    componentDidMount() {
        console.log("componentDidMount executed");

        getCategories()
            .then((response) => {
                console.log('allCategories', response);
                this.setState({
                    categoryList: response.data.categories,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
    };

    render() {
        let allCategories = [];
        console.log("this.state.categoryList", this.state.categoryList);
        if (this.state.categoryList.length != 0) {
            allCategories = this.state.categoryList.map((category, index) => {
                // console.log(index, category.categories.name);
                // console.log(index, category.categories.id);
                // console.log("category.categories", category.categories);
                return <CategoryItem key={index} category={category.categories} handleCategoryResultList={this.props.handleCategoryResultList}/>
            });
        }
        else {
            allCategories = <h3></h3>
        }

        return (
            <div>

                <div class="row search">
                    <div class="col s12 m6">
                        <div class="card search">
                            <div class="card-content black-text search-box">
                                <form>
                                    <input type = "text"
                                        value = {this.state.searchValue}
                                        placeholder = "Enter City to Search Restaurants:"
                                        onChange = {this.onTextBoxChange}
                                    />
                                </form>
                                <div className='button-container'>
                                <a class="waves-effect waves-light btn-large" onClick={this.searchCity}>Search</a>
                                <a class="waves-effect waves-light btn-large" onClick={this.clearPanel}>Clear</a>
                                <a class="waves-effect waves-light btn-large" onClick={this.setRandom}>I'm Feeling Lucky</a>
                                <a class="waves-effect waves-light btn-large"  onClick={this.viewMyFavorites}>View My Favorites</a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br></br>
                        <div className="categories">
                            <div class="card-content black-text">
                                {allCategories}
                            </div>
                        </div>
                        <br></br>
            </div>
        );
    }
}

export default Search;