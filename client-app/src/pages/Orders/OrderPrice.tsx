import React, { Component } from 'react';
import './orders.scss';
import { getOrderPrice } from '../../services/orders.service';
import { InputState } from './Order';
import { LinearProgress, Box } from '@material-ui/core';

type OrderProps = {
  order: InputState;
};

class OrderPriceModal extends Component<OrderProps> {
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
      <div className='order-price'>
        {!this.state.loaded ? (
          <Box className='progress-bar'>
            <LinearProgress />
          </Box>
        ) : (
          <React.Fragment>
            <article className='title'>Expected:</article>
            <span className='price'>{this.state.price}</span>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default OrderPriceModal;
