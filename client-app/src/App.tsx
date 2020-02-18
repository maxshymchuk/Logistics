import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import VehicleList from './Vehicles/VehicleList';
import UserList from './Users/UserList';
import CreateOrder from './Orders/Order';
import './app.scss';

axios.defaults.baseURL = 'http://localhost:3000';

class App extends Component {
  render() {
    return (
      <section className='wrapper'>
        <Router>
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
          <Switch>
            <Route exact path='/'></Route>
            <Route path='/vehicles'>
              <VehicleList />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/locations'>{/* <Dashboard /> */}</Route>
            <Route path='/orders'>{/* <Dashboard /> */}</Route>
            <Route path='/create'>
              <CreateOrder />
            </Route>
            <Route path='/track'>{/* <Dashboard /> */}</Route>
          </Switch>
        </Router>
      </section>
    );
  }
}

export default App;
