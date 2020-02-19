import React, { Component, FormEvent } from 'react';
import { Location } from '../../models/locations.models';
import { getLocationsData } from '../../services/locations.service';
import OrderPriceModal from './OrderPriceModal';
import Loader, { LoaderType } from '../../components/Loader/Loader';

import './orders.scss';
import FormSelect from '../../components/Form/FormSelect/FormSelect';
import FormInput from '../../components/Form/FormInput/FormInput';

export type InputState = {
  from: string;
  to: string;
  vehicle: string;
  cargos: string;
  message: string;
};

type State = {
  locations: Location[];
  isLoaded: boolean;
  isChecked: boolean;
  input: InputState;
};

class Order extends Component<{}, State> {
  state = {
    locations: [],
    isLoaded: false,
    isChecked: false,

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
    console.log(event.currentTarget);
    // switch (event.currentTarget.parentElement?.className) {
    //   case 'order-from': {
    //     const element = event.currentTarget as HTMLSelectElement;
    //     this.setState(state => ({
    //       input: { ...state.input, from: element.value }
    //     }));
    //     break;
    //   }
    //   case 'order-to': {
    //     const element = event.currentTarget as HTMLSelectElement;
    //     this.setState(state => ({
    //       input: { ...state.input, ['to']: element.value }
    //     }));
    //     break;
    //   }
    //   case 'order-vehicle': {
    //     const element = event.currentTarget as HTMLSelectElement;
    //     this.setState(state => ({
    //       input: { ...state.input, ['vehicle']: element.value }
    //     }));
    //     break;
    //   }
    //   case 'order-cargos': {
    //     const element = event.currentTarget as HTMLInputElement;
    //     this.setState(state => ({
    //       input: { ...state.input, ['cargos']: element.value }
    //     }));
    //     break;
    //   }
    //   case 'order-message': {
    //     const element = event.currentTarget as HTMLTextAreaElement;
    //     this.setState(state => ({
    //       input: { ...state.input, ['message']: element.value }
    //     }));
    //     break;
    //   }
    // }
  };

  handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  showPrice() {
    this.setState({ isChecked: true });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isChecked && <OrderPriceModal order={this.state.input} />}
        <form className='order' onSubmit={this.handleSubmit}>
          <section className='order-inputs'>
            {!this.state.isLoaded ? (
              <Loader loaderType={LoaderType.Linear} />
            ) : (
              <FormSelect label='From' options={this.state.locations} />
            )}
            {!this.state.isLoaded ? (
              <Loader loaderType={LoaderType.Linear} />
            ) : (
              <FormSelect label='To' options={this.state.locations} />
            )}
            <FormSelect label='Vehicle' options={['Car', 'Plane', 'Train']} />
            <label className='order-cargos'>
              <FormInput label='Cargos' />
            </label>
            <label className='order-message'>
              <span>Message</span>
              <textarea onChange={this.handleChange} />
            </label>
          </section>
          <input type='submit' value='Check' onClick={() => this.showPrice()} />
        </form>
      </React.Fragment>
    );
  }
}

export default Order;
