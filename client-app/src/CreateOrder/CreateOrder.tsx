import React, { Component } from 'react';
import axios from 'axios';
import './createOrder.scss';
import { Location } from '../models';
import { getLocationsData } from './createOrder.service';
import OrderOption from './OrderOption';

class CreateOrder extends Component<{}, { locations: Location[] }> {
  state = {
    locations: []
  };

  async componentDidMount() {
    const locations: Location[] = await getLocationsData();
    this.setState({ locations });
  }

  render() {
    return (
      <form className='order'>
        <section className='order-inputs'>
          <label htmlFor='order-from'>
            <span className='input-label'>From</span>
            <select className='order-from' id='order-from'>
              {this.state.locations.map((location: Location) => {
                return <OrderOption location={location} key={location._id} />;
              })}
            </select>
          </label>
          <label htmlFor='order-to'>
            <span className='input-label'>To</span>
            <select className='order-to' id='order-to'>
              {this.state.locations.map((location: Location) => {
                return <OrderOption location={location} key={location._id} />;
              })}
            </select>
          </label>
          <label htmlFor='order-vehicle'>
            <span className='input-label'>Choose vehicle</span>
            <select className='order-vehicle' id='order-vehicle'>
              <option value='Car'>Car</option>
              <option value='Plane'>Plane</option>
              <option value='Train'>Train</option>
            </select>
          </label>
          <label htmlFor='order-cargos'>
            <span className='input-label'>Cargos</span>
            <input className='order-cargos' id='order-cargos' type='' />
          </label>
        </section>
        <input type='submit' value='Ok' />
        <input type='reset' value='Cancel' />
      </form>
    );
  }
}

export default CreateOrder;
