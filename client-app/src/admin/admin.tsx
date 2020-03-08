import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './admin.module.scss';
import VehicleList from './components/Vehicles/VehicleList';
import UserList from './components/Users/UserList';
import Menu from './components/Menu/Menu';

class App extends Component {
  render() {
    return (
      <Router>
        <Menu />
        <section className={styles.wrapper}>
          <Switch>
            <Route path='/vehicles' component={VehicleList} />
            <Route path='/users' component={UserList} />
            <Route path='/locations'>{/* <Dashboard /> */}</Route>
            <Route path='/orders'>{/* <Dashboard /> */}</Route>
          </Switch>
        </section>
      </Router>
    );
  }
}

export default App;
