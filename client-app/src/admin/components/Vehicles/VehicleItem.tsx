import React, { Component } from 'react';
import styles from './vehicles.module.scss';
import { Vehicle } from '../../../models/vehicles.models';

type VehicleItemProps = {
  vehicle: Vehicle;
};

class VehicleItem extends Component<VehicleItemProps> {
  render() {
    const { destination, type, arrivalDate } = this.props.vehicle;
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
          {new Date(arrivalDate).toDateString()}
        </div>
        <div className={`vehicle-image ${type.toLowerCase()}`}></div>
      </div>
    );
  }
}

export default VehicleItem;
