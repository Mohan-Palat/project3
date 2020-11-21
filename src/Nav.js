import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to='/overview'>Overview</Link>
      { ' | ' }
      <Link to='/nearby'>Nearby Restaurants</Link>
      { ' | ' }
      <Link to='/reviews'>Reviews</Link>
    </nav>
  )
}
export default Nav;