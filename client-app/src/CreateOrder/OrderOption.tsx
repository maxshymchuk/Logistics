import React, { Component } from 'react';
import axios from 'axios';
import './createOrder.scss';
import { LocationProps } from '../models';

class OrderOption extends Component<LocationProps> {
  async componentDidMount() {}

  render() {
    const location = this.props.location.name;
    return <option value={location}>{location}</option>;
  }
}

export default OrderOption;
