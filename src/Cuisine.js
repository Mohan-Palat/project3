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
    
    // The cuisine details gets a list of the cuisines based on the City ID.
    getCusineDetails = () => {

        getCuisines(this.props.cityID)
            .then((response) => {
                this.setState({
                    cuisineList: response.data.cuisines,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
    }
    
    // The cuisine details gets a list of the cuisines based on the City ID.
    // This is run when the component is first rendered.
    componentDidMount() {

        getCuisines(this.props.cityID)
            .then((response) => {
                this.setState({
                    cuisineList: response.data.cuisines,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
    };
    
    render() {

        // This code checks to see if the city changed.  If the city changed,
        // then the cuisines need to be retrieved for the new city.
        let changeCityFlag = false;
        
        if (this.state.cityID != this.props.cityID) {
            this.setState({    toggleShowReviews: false,
                toggleShowNearbyRestaurants: false,
                cityID: this.props.cityID,
            });
            this.getCusineDetails();
            changeCityFlag = true;
        }
        
        // If the cuisine list is not empty, then build each Cuisine Item (i.e. checkbox).
        // If the city is new, then the checkboxes are all set to an "unchecked" state.
        let allCuisines = [];

        if (this.state.cuisineList.length != 0) {
            allCuisines = this.state.cuisineList.map((cuisine, index) => {

                return <CuisineItem key={index} cuisine={cuisine.cuisine} handleCuisineResultList={this.props.handleCuisineResultList} changeCityFlag={changeCityFlag}/>
            });
        }
        else {
            allCuisines = <h3></h3>
        }

        // Set the flag back to false after the Cuisine Items are all unchecked.
        changeCityFlag = false;

        return (
            <div>
                <div class="row s24 m12">
                    <div class="col s24 m12 category-checkboxes">
                        <div class="card lighten-1">
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