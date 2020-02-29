import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import ControlsSelect from '../../../components/Controls/ControlsSelect';
import OrderPrice from './CreateOrderPrice/CreateOrderPrice';
import React, { Component } from 'react';
import styles from './createOrder.module.scss';
import { Box, Button, Card, CircularProgress, Divider, TextField } from '@material-ui/core';
import { createOrder } from '../../../services/orders.service';
import { getLocationsData } from '../../../services/locations.service';
import { Location } from '../../../models/locations.models';
import { OrderUserInput } from '../../../models/orders.models';
import { VehicleType } from '../../../models/vehicles.models';

type CreateOrderState = {
  locations: Location[];
  trackNumber: string;
  isLoaded: boolean;
  isPriceChecked: boolean;
  isOrderCreated: boolean;
  isError: {
    from: boolean;
    to: boolean;
  };
  input: OrderUserInput;
};

class CreateOrder extends Component<{}, CreateOrderState> {
  state = {
    locations: [],
    trackNumber: '',
    isLoaded: false,
    isPriceChecked: false,
    isOrderCreated: false,
    isError: {
      from: false,
      to: false
    },

    input: {
      from: '',
      to: '',
      cargos: '',
      message: ''
    }
  };

  async componentDidMount() {
    const locations: Location[] = await getLocationsData();
    this.setState({ locations, isLoaded: true });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const property = event.target.name;
    this.setState(state => ({
      input: { ...state.input, [property]: value },
      isError: { ...state.isError, [property]: false },
      isPriceChecked: false
    }));
  };

  showPrice = () => {
    if (this.state.input.from && this.state.input.to) {
      this.setState(state => ({
        isPriceChecked: true,
        isError: {
          from: false,
          to: false
        }
      }));
    } else {
      this.setState(state => ({
        isError: {
          from: !state.input.from,
          to: !state.input.to
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
    return (
      <Card className={styles.order}>
        {!this.state.isOrderCreated ? (
          <form>
            <section className={styles.inputs}>
              <div className={styles.from}>
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
              <div className={styles.to}>
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
              <div className={styles.cargos}>
                <TextField name='cargos' label='Cargos' onChange={this.handleChange} fullWidth />
              </div>
              <div className={styles.message}>
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
                <div className={styles['button-check']}>
                  <Button variant='outlined' color='primary' onClick={this.showPrice} fullWidth>
                    Check price
                  </Button>
                </div>
              )}
              {this.state.isPriceChecked && (
                <React.Fragment>
                  <div className={styles.price}>
                    <OrderPrice order={this.state.input} />
                  </div>
                  <div className={styles['button-confirm']}>
                    <Button variant='contained' color='primary' onClick={this.createOrder} fullWidth>
                      Create order
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </section>
          </form>
        ) : (
          <React.Fragment>
            <article className={styles.congrats}>
              <CheckCircleOutlineOutlinedIcon className={styles.image} />
              <span className={styles.title}>Order has been created</span>
            </article>
            <Divider className={styles.divider} />
            <section className={styles.track}>
              <article className={styles.title}>Your track number</article>
              <span className={styles['track-number']}>{this.state.trackNumber}</span>
              <span className={styles.help}>Use this code to track your parcels</span>
            </section>
          </React.Fragment>
        )}
      </Card>
    );
  }
}

export default CreateOrder;
