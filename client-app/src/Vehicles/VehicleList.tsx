import React, { Component } from 'react';
import VehicleItem from './VehicleItem';
import { Vehicle } from './vehicles.models';
import { getVehiclesData } from './vehicles.service';

class VehicleList extends Component<{}, { vehicles: Vehicle[] }> {
  state = {
    vehicles: []
  };

  async componentDidMount() {
    const vehicles: Vehicle[] = await getVehiclesData();
    this.setState({ vehicles });
  }

  render() {
    return (
      <section className='vehicles'>
        {this.state.vehicles.map((vehicle: Vehicle) => {
          return <VehicleItem vehicle={vehicle} key={vehicle._id} />;
        })}
      </section>
    );
  }
}

export default VehicleList;
