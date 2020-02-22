import React, { Component } from 'react';
import { Location } from '../../models/locations.models';
import { getLocationsData } from '../../services/locations.service';
import { createOrder } from '../../services/orders.service';
import OrderPrice from './OrderPrice';

import './orders.scss';
import { Button, Card, TextField, CircularProgress, Box, Divider } from '@material-ui/core';
import ControlsSelect from '../../components/Controls/ControlsSelect';
import { VehicleType } from '../../models/vehicles.models';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

export type InputState = {
  from: string;
  to: string;
  vehicle: string;
  cargos: string;
  message: string;
};

type State = {
  locations: Location[];
  trackNumber: string;
  isLoaded: boolean;
  isPriceChecked: boolean;
  isOrderCreated: boolean;
  isError: {
    from: boolean;
    to: boolean;
    vehicle: boolean;
  };
  input: InputState;
};

class Order extends Component<{}, State> {
  state = {
    locations: [],
    trackNumber: '',
    isLoaded: false,
    isPriceChecked: false,
    isOrderCreated: false,
    isError: {
      from: false,
      to: false,
      vehicle: false
    },

    input: {
      from: '',
      to: '',
      vehicle: '',
      cargos: '',
      message: ''
    }
  };

  async componentDidMount() {
    const locations: Location[] = await getLocationsData();
    this.setState({ locations, isLoaded: true });
  }

  handleChange = (event: any) => {
    const value = event.target.value;
    const property: 'from' | 'to' | 'vehicle' | 'cargos' | 'message' = event.target.name;
    this.setState(state => ({
      input: { ...state.input, [property]: value },
      isError: { ...state.isError, [property]: false },
      isPriceChecked: false
    }));
  };

  showPrice = () => {
    if (this.state.input.from && this.state.input.to && this.state.input.vehicle) {
      this.setState(state => ({
        isPriceChecked: true,
        isError: {
          from: false,
          to: false,
          vehicle: false
        }
      }));
    } else {
      this.setState(state => ({
        isError: {
          from: !this.state.input.from,
          to: !this.state.input.to,
          vehicle: !this.state.input.vehicle
        }
      }));
    }
  };

  createOrder = async () => {
    const trackNumber = await createOrder(this.state.input);
    this.setState(state => ({
      isOrderCreated: true,
      trackNumber: trackNumber
    }));
  };

  render() {
    const vehicleList = Object.keys(VehicleType).map(i => {
      return { name: i };
    });
    return (
      <Card className='order'>
        {!this.state.isOrderCreated ? (
          <form>
            <section className='order-inputs'>
              <div className='order-from'>
                {!this.state.isLoaded ? (
                  <Box className='progress-bar'>
                    <CircularProgress />
                  </Box>
                ) : (
                  <ControlsSelect
                    isError={this.state.isError.from}
                    label='From'
                    options={this.state.locations}
                    valueProp='_id'
                    textProp='name'
                    onChange={this.handleChange}
                  />
                )}
              </div>
              <div className='order-to'>
                {!this.state.isLoaded ? (
                  <Box className='progress-bar'>
                    <CircularProgress />
                  </Box>
                ) : (
                  <ControlsSelect
                    isError={this.state.isError.to}
                    label='To'
                    options={this.state.locations}
                    valueProp='_id'
                    textProp='name'
                    onChange={this.handleChange}
                  />
                )}
              </div>
              <div className='order-vehicle'>
                <ControlsSelect
                  isError={this.state.isError.vehicle}
                  label='Vehicle'
                  options={vehicleList}
                  valueProp='name'
                  textProp='name'
                  onChange={this.handleChange}
                />
              </div>
              <div className='order-cargos'>
                <TextField name='cargos' label='Cargos' onChange={this.handleChange} fullWidth />
              </div>
              <div className='order-message'>
                <TextField
                  name='message'
                  label='Message'
                  variant='outlined'
                  onChange={this.handleChange}
                  multiline
                  fullWidth
                />
              </div>
              {!this.state.isPriceChecked && (
                <div className='order-button-check'>
                  <Button variant='outlined' color='primary' onClick={this.showPrice} fullWidth>
                    Check price
                  </Button>
                </div>
              )}
              {this.state.isPriceChecked && (
                <React.Fragment>
                  <div className='order-price'>
                    <OrderPrice order={this.state.input} />
                  </div>
                  <div className='order-button-confirm'>
                    <Button variant='contained' color='primary' onClick={this.createOrder} fullWidth>
                      Create order
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </section>
          </form>
        ) : (
          <section className='order-created'>
            <div className='order-congrats'>
              <CheckCircleOutlineOutlinedIcon style={{ fontSize: '5rem' }} />
              <span className='title'>Order has been created</span>
            </div>
            <Divider className='order-divider' />
            <div className='order-track'>
              <article className='title'>Your track number</article>
              <span className='track'>{this.state.trackNumber}</span>
              <span className='help'>Use this code to track your parcels</span>
            </div>
          </section>
        )}
      </Card>
    );
  }
}

export default Order;
