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
        let changeCityFlag = false;
        
        if (this.state.cityID != this.props.cityID) {
            this.setState({    toggleShowReviews: false,
                toggleShowNearbyRestaurants: false,
                cityID: this.props.cityID,
            });
            this.getCusineDetails();
            changeCityFlag = true;
        }
        
        let allCuisines = [];

        if (this.state.cuisineList.length != 0) {
            allCuisines = this.state.cuisineList.map((cuisine, index) => {

                return <CuisineItem key={index} cuisine={cuisine.cuisine} handleCuisineResultList={this.props.handleCuisineResultList} changeCityFlag={changeCityFlag}/>
            });
        }
        else {
            allCuisines = <h3></h3>
        }

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