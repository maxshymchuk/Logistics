import React, { Component } from 'react';
import './orders.scss';
import { LocationProps } from '../models';

class OrderOption extends Component<LocationProps> {
  async componentDidMount() {}

  render() {
    const location = this.props.location.name;
    return <option value={location}>{location}</option>;
  }
}

export default OrderOption;
