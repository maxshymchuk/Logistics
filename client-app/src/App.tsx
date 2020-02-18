import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import VehicleList from './Vehicles/VehicleList';
import UserList from './Users/UserList';
import CreateOrder from './CreateOrder/CreateOrder';
import './app.scss';

axios.defaults.baseURL = 'http://localhost:3000';

class App extends Component {
  render() {
    return (
      <section className='wrapper'>
        <Router>
          <section className='menu'>
            <Link to='/'>
              <button className='button_home'>Home</button>
            </Link>
            <Link to='/vehicles'>
              <button className='button_vehicles'>Vehicles</button>
            </Link>
            <Link to='/users'>
              <button className='button_users'>Users</button>
            </Link>
            <Link to='/locations'>
              <button className='button_locations'>Locations</button>
            </Link>
            <Link to='/orders'>
              <button className='button_orders'>Orders</button>
            </Link>
            <Link to='/create'>
              <button className='button_createOrder'>Create order page</button>
            </Link>
            <Link to='/track'>
              <button className='button_trackOrder'>Track order page</button>
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
