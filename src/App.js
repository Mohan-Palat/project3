import React, { Component } from 'react';
import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>Easy Pickins</h1>
        <Search handleSearchCriteria={this.handleSearchCriteria}/>

      </div>
    );
  }

  handleSearchCriteria = (searchValue) => {
    console.log('Search value in App.js', searchValue);
  }

}

export default App;
