import axios from 'axios';
import CreateOrder from './pages/Orders/CreateOrder/CreateOrder';
import { Menu } from './components/Menu/Menu';
import React, { Component } from 'react';
import TrackOrder from './pages/Orders/TrackOrder/TrackOrder';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.scss';
import { Home } from './pages/Home/home';

axios.defaults.baseURL = 'http://localhost:3000';

class App extends Component {
  render() {
    return (
      <Router>
        <Menu />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/create' component={CreateOrder} />
          <Route path='/track' component={TrackOrder} />
        </Switch>
      </Router>
    );
  }
}

export default App;
