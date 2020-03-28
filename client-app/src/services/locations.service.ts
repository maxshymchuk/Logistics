import axios from 'axios';

import { Location } from '../models/location.models';
import { Message } from '../models/message.models';

export async function getLocationsData() {
  const message: Message<Location[]> = (await axios.get('/locations')).data;
  return message;
}

export async function addLocation(location: Location) {
  const message: Message<string> = (await axios.post('/locations', location)).data;
  return message;
}

export async function removeLocationById(id: string) {
  const message: Message<string> = (await axios.delete(`/locations/${id}`)).data;
  return message;
}