import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import ControlsSelect from '../../../components/Controls/ControlsSelect';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import OrderPathsList from './OrderPathsList/OrderPathsList';
import React, { Component } from 'react';
import styles from './createOrder.module.scss';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField
} from '@material-ui/core';
import { createOrder } from '../../../services/orders.service';
import { getLocationsData } from '../../../services/locations.service';
import { Location, UserPath } from '../../../models/locations.models';
import { OrderUser } from '../../../models/orders.models';

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
    const locations: Location[] = await getLocationsData();
    this.setState({ locations, isLoaded: true });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const property = event.target.name;
    this.setState(state => ({
      input: { ...state.input, [property]: value },
      isError: { ...state.isError, [property]: false },
      isRoutesShown: false
    }));
  };

  showRoutes = () => {
    if (this.state.input.from && this.state.input.to) {
      this.setState(state => ({
        isRoutesShown: true,
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

  takeOrder = async (path: UserPath) => {
    const trackNumber = await createOrder(path);
    this.setState(state => ({
      isOrderTaken: true,
      trackNumber: trackNumber
    }));
  };

  render() {
    return (
      <Card className={styles.order}>
        {!this.state.isOrderTaken ? (
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
                <List>
                  <ListItem dense disableGutters>
                    <TextField name='description' label='Description' onChange={this.handleChange} />
                    {/* <ControlsSelect isError={} label='Cargo Type' options={} valueProp='_id' textProp='name' /> */}
                    <ListItemSecondaryAction>
                      <IconButton edge='end'>
                        <DeleteForeverIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
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
              {this.state.isRoutesShown ? (
                <div className={styles.list}>
                  <article className={styles.title}>Choose a suitable route</article>
                  <OrderPathsList order={this.state.input} callback={this.takeOrder} />
                </div>
              ) : (
                <div className={styles['button-check']}>
                  <Button variant='outlined' color='primary' onClick={this.showRoutes} fullWidth>
                    Show possible routes
                  </Button>
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
              <span className={styles['track-number']}>{this.state.trackNumber}</span>
              <span className={styles.help}>Use this code to track your parcels</span>
            </section>
          </>
        )}
      </Card>
    );
  }
}

export default CreateOrder;
