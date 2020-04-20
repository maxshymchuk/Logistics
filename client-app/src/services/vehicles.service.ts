import axios from 'axios';

import { ServerResponse } from '../models/message.models';
import { Vehicle } from '../models/vehicle.models';

export async function getVehiclesData() {
  const response: ServerResponse<Vehicle[]> = (await axios.get('/vehicles')).data;
  return response;
}

export async function addVehicle(vehicle: Vehicle) {
  const response: ServerResponse<null> = (await axios.post('/vehicles', vehicle)).data;
  return response;
}

export async function removeVehicleById(id: string) {
  const response: ServerResponse<null> = (await axios.delete(`/vehicles/${id}`)).data;
  return response;
}