import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './menu.scss';
import TimeChanger from './components/TimeChanger/TimeChanger';

class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <AppBar className='menu' position='static'>
          <Toolbar>
            <Typography className='menu-title' variant='h6'>
              Logistics
            </Typography>
            <Link to='/'>
              <Button color='inherit'>Home</Button>
            </Link>
            <Link to='/vehicles'>
              <Button color='inherit'>Vehicles</Button>
            </Link>
            <Link to='/users'>
              <Button color='inherit'>Users</Button>
            </Link>
            <Link to='/locations'>
              <Button color='inherit'>Locations</Button>
            </Link>
            <Link to='/orders'>
              <Button color='inherit'>Orders</Button>
            </Link>
            <Link to='/create'>
              <Button color='inherit'>Create order page</Button>
            </Link>
            <Link to='/track'>
              <Button color='inherit'>Track order page</Button>
            </Link>
            <TimeChanger />
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Menu;
