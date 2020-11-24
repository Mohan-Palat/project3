import React, { Component } from 'react';
import { getCuisines } from './api.js';
import CuisineItem from './CuisineItem';

class Cuisine extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searchValue : '',
          cuisineList: [],
          cityID: '',
        }
      }
    
    getCusineDetails = () => {
        console.log("componentDidMount executed");

        getCuisines(this.props.cityID)
            .then((response) => {
                // console.log('allCuisines', response);
                this.setState({
                    cuisineList: response.data.cuisines,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
    }
    
    componentDidMount() {
        console.log("componentDidMount executed");

        getCuisines(this.props.cityID)
            .then((response) => {
                // console.log('allCuisines', response);
                this.setState({
                    cuisineList: response.data.cuisines,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
    };
    
    render() {
        console.log("Cuisine render");
        
        if (this.state.cityID != this.props.cityID) {
            this.setState({
                toggleShowReviews: false,
                toggleShowNearbyRestaurants: false,
                cityID: this.props.cityID,
            });

            console.log("THIS HAS RUN");
            this.getCusineDetails();
        }
        
        let allCuisines = [];
        // console.log("this.state.cuisineList", this.state.cuisineList);
        if (this.state.cuisineList.length != 0) {
            allCuisines = this.state.cuisineList.map((cuisine, index) => {
                // console.log(index, cuisine);
                // console.log(index, cuisine.cuisine.cuisine_id);
                // console.log("category.categories", category.categories);
                return <CuisineItem key={index} cuisine={cuisine.cuisine} handleCuisineResultList={this.props.handleCuisineResultList}/>
            });
        }
        else {
            allCuisines = <h3></h3>
        }

        return (
            <div>
                <div class="row s24 m12">
                    <div class="col s24 m12 categories">
                        <div class="card yellow lighten-1">
                            <div class="card-content black-text">
                                <h5>Cuisines</h5>
                                {allCuisines}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cuisine;