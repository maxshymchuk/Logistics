import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import TimeChanger from './TimeChanger/TimeChanger';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './menu.scss';

class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <AppBar className='menu' position='static'>
          <Toolbar>
            <Typography className='menu-title' variant='h6'>
              Logistics
            </Typography>
            <Button color='inherit' component={Link} to='/'>Home</Button>
            <Button color='inherit' component={Link} to='/vehicles'>Vehicles</Button>
            <Button color='inherit' component={Link} to='/users'>Users</Button>
            <Button color='inherit' component={Link} to='/locations'>Locations</Button>
            <Button color='inherit' component={Link} to='/orders'>Orders</Button>
            <Button color='inherit' component={Link} to='/create'>Create order page</Button>
            <Button color='inherit' component={Link} to='/track'>Track order page</Button>
            <TimeChanger />
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Menu;
