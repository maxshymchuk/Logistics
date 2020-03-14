import axios from 'axios';

export async function regenVehicles(): Promise<string> {
  return (await axios.get('vehicles/regen')).data;
}

export async function regenLocations(): Promise<string> {
  return (await axios.get('locations/regen')).data;
}
