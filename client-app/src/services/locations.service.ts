import axios from 'axios';

import { Location } from '../models/locations.models';

export async function getLocationsData(): Promise<Location[]> {
  const res = (await axios.get('/locations')).data;
  return res;
}

export async function addLocation(location: Location): Promise<string> {
  const res = (await axios.post('/locations', location)).data;
  return res;
}

export async function removeLocationById(id: string): Promise<string> {
  const res = (await axios.delete(`/locations/${id}`)).data;
  return res;
}