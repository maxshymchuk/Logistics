import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './menu.scss';

class Menu extends Component {
  render() {
    return (
      <section className='menu'>
        <Link className='menu__button' to='/'>
          Home
        </Link>
        <Link className='menu__button' to='/vehicles'>
          Vehicles
        </Link>
        <Link className='menu__button' to='/users'>
          Users
        </Link>
        <Link className='menu__button' to='/locations'>
          Locations
        </Link>
        <Link className='menu__button' to='/orders'>
          Orders
        </Link>
        <Link className='menu__button' to='/create'>
          Create order page
        </Link>
        <Link className='menu__button' to='/track'>
          Track order page
        </Link>
      </section>
    );
  }
}

export default Menu;
