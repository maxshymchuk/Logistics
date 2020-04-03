import axios from 'axios';

import { Location } from '../models/location.models';
import { ServerResponse } from '../models/message.models';

export async function getLocationsData() {
  const response: ServerResponse<Location[]> = (await axios.get('/locations')).data;
  return response;
}

export async function addLocation(location: Location) {
  const response: ServerResponse<null> = (await axios.post('/locations', location)).data;
  return response;
}

export async function removeLocationById(id: string) {
  const response: ServerResponse<null> = (await axios.delete(`/locations/${id}`)).data;
  return response;
}