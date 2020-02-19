import axios from 'axios';

export async function getVehiclesData() {
  return (await axios.get('/vehicles')).data;
}
