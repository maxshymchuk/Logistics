import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import VehicleList from './components/Vehicles/VehicleList';
import UserList from './pages/Users/UserList';
import CreateOrder from './pages/Orders/Order';
import './app.scss';
import Menu from './components/Menu/Menu';

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
            <Route path='/track'>{/* <Dashboard /> */}</Route>
          </Switch>
        </section>
      </Router>
    );
  }
}

export default App;
