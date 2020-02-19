import React, { Component } from 'react';
import VehicleItem from './VehicleItem';
import { Vehicle } from '../../models/vehicles.models';
import { getVehiclesData } from '../../services/vehicles.service';
import Loader, { LoaderType } from '../Loader/Loader';

class VehicleList extends Component<{}, { vehicles: Vehicle[]; loaded: boolean }> {
  state = {
    vehicles: [],
    loaded: false
  };

  async componentDidMount() {
    const vehicles: Vehicle[] = await getVehiclesData();
    this.setState({ vehicles, loaded: true });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <Loader loaderType={LoaderType.Circle} />}
        <section className='vehicles'>
          {this.state.vehicles.map((vehicle: Vehicle) => {
            return <VehicleItem vehicle={vehicle} key={vehicle._id} />;
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default VehicleList;
