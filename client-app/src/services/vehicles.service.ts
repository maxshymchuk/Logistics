import axios from 'axios';

import { Message } from '../models/message.models';
import { Vehicle } from '../models/vehicle.models';

export async function getVehiclesData() {
  const message: Message<Vehicle[]> = (await axios.get('/vehicles')).data;
  return message;
}

export async function addVehicle(vehicle: Vehicle) {
  const message: Message<string> = (await axios.post('/vehicles', vehicle)).data;
  return message;
}

export async function removeVehicleById(id: string) {
  const message: Message<string> = (await axios.delete(`/vehicles/${id}`)).data;
  return message;
}