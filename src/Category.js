import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import { getCategories } from './api.js';

class Category extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searchValue : '',
          categoryList: [],
        }
      }

    componentDidMount() {

        // This function gets a list of the categories.
        // This function adds the selection of "None" and sets the ID to 0 (i.e. zero).
        // The "None" option is added to the beginning of the categoryList array.
        getCategories()
            .then((response) => {
                let categoryList = response.data.categories;
                categoryList.unshift({categories: {id: 0, name: "None"}});

                this.setState({
                    categoryList: categoryList,
                });
            })
            .catch((error) => {
                console.log('API ERROR:', error);
            });
    };

    render() {
        let allCategories = [];
        
        if (this.state.categoryList.length != 0) {
            allCategories = this.state.categoryList.map((category, index) => {
    
                return <CategoryItem key={index} category={category.categories} handleCategoryResultList={this.props.handleCategoryResultList}/>
            
            });
        }
        else {
            allCategories = <h3></h3>
        }

        return (
            <div>

                <div class="row s24 m12">
                    <div class="col s24 m12 categories category-checkboxes">
                        <div class="card lighten-1">
                            <div class="card-content black-text">
                                <h5>Category</h5>
                                <form>
                                    {allCategories}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default Category;