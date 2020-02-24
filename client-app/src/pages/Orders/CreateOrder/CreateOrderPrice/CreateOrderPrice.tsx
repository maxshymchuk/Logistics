import React, { Component } from 'react';
import styles from './createOrderPrice.module.scss';
import { Box, LinearProgress } from '@material-ui/core';
import { getOrderPrice } from '../../../../services/orders.service';
import { OrderUserInput } from '../../../../models/orders.models';

type CreateOrderPriceProps = {
  order: OrderUserInput;
};

class CreateOrderPrice extends Component<CreateOrderPriceProps> {
  state = {
    price: 0,
    loaded: false
  };

  async componentDidMount() {
    const price = await getOrderPrice(this.props.order);
    this.setState({ price: price, loaded: true });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded ? <LinearProgress /> : <span className={styles.price}>{this.state.price}</span>}
      </React.Fragment>
    );
  }
}

export default CreateOrderPrice;
