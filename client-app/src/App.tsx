import axios from 'axios';
import CreateOrder from './pages/Orders/CreateOrder/CreateOrder';
import Menu from './components/Menu/Menu';
import React, { Component } from 'react';
import TrackOrder from './pages/Orders/TrackOrder/TrackOrder';
import UserList from './pages/Users/UserList';
import VehicleList from './components/Vehicles/VehicleList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.scss';

axios.defaults.baseURL = 'http://localhost:3000';

class App extends Component {
  render() {
    return (
      <Router>
        <Menu />
        <section className='wrapper'>
          <Switch>
            <Route exact path='/'></Route>
            <Route path='/vehicles' component={VehicleList} />
            <Route path='/users' component={UserList} />
            <Route path='/locations'>{/* <Dashboard /> */}</Route>
            <Route path='/orders'>{/* <Dashboard /> */}</Route>
            <Route path='/create' component={CreateOrder} />
            <Route path='/track' component={TrackOrder} />
          </Switch>
        </section>
      </Router>
    );
  }
}

export default App;
