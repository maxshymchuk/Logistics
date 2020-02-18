import React, { Component } from 'react';
import './orders.scss';
import { OrderProps } from './orders.models';
import { getOrderPrice } from './orders.service';
import Loader, { LoaderType } from '../Loader';

const modalStyle: React.CSSProperties = {
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0',
  bottom: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
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
      <div style={modalStyle}>
        {!this.state.loaded ? (
          <Loader loaderType={LoaderType.Circle} />
        ) : (
          <div style={{ background: 'yellow' }}>
            <article>Price</article>
            <p>{this.state.price}</p>
          </div>
        )}
      </div>
    );
  }
}

export default OrderPriceModal;
