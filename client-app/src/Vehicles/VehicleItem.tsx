import React, { Component } from 'react';
import { VehicleProps } from './vehicles.models';
import './vehicles.scss';

class VehicleItem extends Component<VehicleProps> {
  render() {
    const { destination, type, date } = this.props.vehicle;
    return (
      <div className='vehicles__item'>
        <div className='vehicle-type'>
          <strong>Vehicle: </strong>
          {type}
        </div>
        <div className='vehicle-destination'>
          <strong>Where: </strong>
          {destination.name}
        </div>
        <div className='vehicle-arrivalDate'>
          <strong>When: </strong>
          {new Date(date).toDateString()}
        </div>
        <div className={`vehicle-image ${type.toLowerCase()}`}></div>
      </div>
    );
  }
}

export default VehicleItem;
