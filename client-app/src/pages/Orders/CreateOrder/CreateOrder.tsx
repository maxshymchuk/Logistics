import React, { Component } from 'react';

import { Button, Card, CircularProgress, Divider, TextField } from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Location, UserPath } from '../../../models/locations.models';
import { OrderUser } from '../../../models/orders.models';
import { getLocationsData } from '../../../services/locations.service';
import { createOrder } from '../../../services/orders.service';
import styles from './createOrder.module.scss';
import OrderPathsList from './OrderPathsList/OrderPathsList';

type CreateOrderState = {
  locations: Location[];
  trackNumber: string;
  isLoaded: boolean;
  isRoutesShown: boolean;
  isOrderTaken: boolean;
  isError: {
    from: boolean;
    to: boolean;
  };
  input: OrderUser;
};

class CreateOrder extends Component<{}, CreateOrderState> {
  state: CreateOrderState = {
    locations: [],
    trackNumber: '',

    isLoaded: false,
    isRoutesShown: false,
    isOrderTaken: false,
    isError: {
      from: false,
      to: false
    },

    input: {
      from: '',
      to: '',
      cargos: [''],
      message: ''
    }
  };

  async componentDidMount() {
    const locations = await getLocationsData();
    this.setState({ locations, isLoaded: true });
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const property = event.target.name;
    this.setState(state => ({
      input: { ...state.input, [property]: value },
      isError: { ...state.isError, [property]: false },
      isRoutesShown: false
    }));
  };

  handleAutocomplete = (event: any, value: Location | null, str: string) => {
    if (value) {
      this.setState(state => ({
        input: { ...state.input, [str]: value.name },
        isError: { ...state.isError, [str]: false },
        isRoutesShown: false
      }));
    }
  };

  showRoutes = () => {
    this.setState(state => ({
      isRoutesShown: !!state.input.from && !!state.input.to,
      isError: {
        from: !state.input.from,
        to: !state.input.to
      }
    }));
  };

  takeOrder = async (path: UserPath) => {
    const trackNumber = await createOrder(path);
    this.setState(state => ({
      isOrderTaken: true,
      trackNumber
    }));
  };

  render() {
    return (
      <Card className={styles.order}>
        {!this.state.isOrderTaken ? (
          <form>
            <section className={styles.form}>
              <article className={styles.title}>Create order</article>
              {!this.state.isLoaded ? (
                <CircularProgress />
              ) : (
                <section className={styles.inputs}>
                  <Autocomplete
                    id="location_from"
                    options={this.state.locations}
                    getOptionLabel={(option: Location) => option.name}
                    renderOption={(option: Location) => option.name}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="Choose from location"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password'
                        }}
                      />
                    )}
                    onChange={(e: any, v: Location | null) =>
                      this.handleAutocomplete(e, v, 'from')}
                    autoHighlight
                    disableClearable
                  />
                  <Autocomplete
                    id="location_to"
                    options={this.state.locations}
                    getOptionLabel={(option: Location) => option.name}
                    renderOption={(option: Location) => option.name}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="Choose to location"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password'
                        }}
                      />
                    )}
                    onChange={(e: any, v: Location | null) =>
                      this.handleAutocomplete(e, v, 'to')}
                    autoHighlight
                    disableClearable
                  />
                </section>
              )}
              <TextField
                name="cargos"
                label="Cargos"
                variant="outlined"
                onChange={this.handleInput}
                fullWidth
              />
              <div className={styles.message}>
                <TextField
                  name="message"
                  label="Message"
                  variant="outlined"
                  onChange={this.handleInput}
                  multiline
                  fullWidth
                />
              </div>
              {this.state.isRoutesShown ? (
                <div className={styles.list}>
                  <article className={styles.title}>
                    Choose a suitable route
                  </article>
                  <OrderPathsList
                    order={this.state.input}
                    callback={this.takeOrder}
                  />
                </div>
              ) : (
                <div className={styles['button-check']}>
                  {!this.state.isError.from && !this.state.isError.to ? (
                    <Button
                      variant="outlined"
                      color="primary" 
                      onClick={this.showRoutes}
                      fullWidth
                    >
                      Show possible routes
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={this.showRoutes}
                      fullWidth
                    >
                      Choose from and to locations
                    </Button>
                  )}
                </div>
              )}
            </section>
          </form>
        ) : (
          <>
            <article className={styles.congrats}>
              <CheckCircleOutlineOutlinedIcon className={styles.image} />
              <span className={styles.title}>Order has been created</span>
            </article>
            <Divider className={styles.divider} />
            <section className={styles.track}>
              <article className={styles.title}>Your track number</article>
              <span className={styles['track-number']}>
                {this.state.trackNumber}
              </span>
              <span className={styles.help}>
                Use this code to track your parcels
              </span>
            </section>
          </>
        )}
      </Card>
    );
  }
}

export default CreateOrder;
