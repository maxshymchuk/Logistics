import React, { Component, FormEvent } from 'react';
import './orders.scss';
import { Location } from '../models';
import { getLocationsData } from '../Locations/locations.service';
import OrderOption from './OrderOption';
import OrderPriceModal from './OrderPriceModal';
import Loader, { LoaderType } from '../Loader';

export type InputState = {
  who: string;
  from: string;
  to: string;
  vehicle: string;
  cargos: string;
  message: string;
};

type State = {
  locations: Location[];
  loaded: boolean;
  checked: boolean;
  input: InputState;
};

class Order extends Component<{}, State> {
  state = {
    locations: [],
    loaded: false,
    checked: false,

    input: {
      who: 'octorix',
      from: '',
      to: '',
      vehicle: '',
      cargos: '',
      message: ''
    }
  };

  async componentDidMount() {
    const locations: Location[] = await getLocationsData();
    this.setState({ locations, loaded: true });
  }

  handleChange(event: FormEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
    switch (event.currentTarget.parentElement?.className) {
      case 'order-from': {
        const element = event.currentTarget as HTMLSelectElement;
        this.setState({ input: { ...this.state.input, from: element.options[element.selectedIndex].value } });
        break;
      }
      case 'order-to': {
        const element = event.currentTarget as HTMLSelectElement;
        this.setState({ input: { ...this.state.input, to: element.options[element.selectedIndex].value } });
        break;
      }
      case 'order-vehicle': {
        const element = event.currentTarget as HTMLSelectElement;
        this.setState({ input: { ...this.state.input, vehicle: element.options[element.selectedIndex].value } });
        break;
      }
      case 'order-cargos': {
        const element = event.currentTarget as HTMLInputElement;
        this.setState({ input: { ...this.state.input, cargos: element.value } });
        break;
      }
      case 'order-message': {
        const element = event.currentTarget as HTMLTextAreaElement;
        this.setState({ input: { ...this.state.input, message: element.value } });
        break;
      }
    }
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  showPrice() {
    this.setState({ checked: true });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.checked && <OrderPriceModal order={this.state.input} />}
        <form className='order' onSubmit={this.handleSubmit}>
          <section className='order-inputs'>
            <label className='order-from'>
              <span>From</span>
              {!this.state.loaded && <Loader loaderType={LoaderType.Linear} />}
              <select onChange={this.handleChange.bind(this)}>
                {this.state.locations.map((location: Location) => {
                  return <OrderOption location={location} key={location._id} />;
                })}
              </select>
            </label>
            <label className='order-to'>
              <span>To</span>
              {!this.state.loaded ? (
                <Loader loaderType={LoaderType.Linear} />
              ) : (
                <select onChange={this.handleChange.bind(this)}>
                  {this.state.locations.map((location: Location) => {
                    return <OrderOption location={location} key={location._id} />;
                  })}
                </select>
              )}
            </label>
            <label className='order-vehicle'>
              <span>Choose vehicle</span>
              <select onChange={this.handleChange.bind(this)}>
                <option value='Car'>Car</option>
                <option value='Plane'>Plane</option>
                <option value='Train'>Train</option>
              </select>
            </label>
            <label className='order-cargos'>
              <span>Cargos</span>
              <input type='text' onChange={this.handleChange.bind(this)} />
            </label>
            <label className='order-message'>
              <span>Message</span>
              <textarea onChange={this.handleChange.bind(this)} />
            </label>
          </section>
          <input type='submit' value='Check' onClick={() => this.showPrice()} />
        </form>
      </React.Fragment>
    );
  }
}

export default Order;
