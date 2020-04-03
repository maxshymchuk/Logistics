import axios from 'axios';

import { ServerResponse } from '../../models/message.models';

export async function regenVehicles() {
  const response: ServerResponse = (await axios.get('vehicles/regen')).data;
  return response;
}

export async function regenLocations() {
  const response: ServerResponse = (await axios.get('locations/regen')).data;
  return response;
}
