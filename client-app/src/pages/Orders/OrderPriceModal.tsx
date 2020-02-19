import React, { Component } from 'react';
import './orders.scss';
import { OrderProps } from '../../models/orders.models';
import { getOrderPrice } from '../../services/orders.service';
import Loader, { LoaderType } from '../../components/Loader/Loader';

const modalStyle: React.CSSProperties = {
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0',
  bottom: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF99'
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
        <div className='order-modal'>
          <article className='title'>Price</article>
          {!this.state.loaded ? <Loader loaderType={LoaderType.Linear} /> : <p className='price'>{this.state.price}</p>}
          <button className='submitButton'>Ok</button>
        </div>
      </div>
    );
  }
}

export default OrderPriceModal;
