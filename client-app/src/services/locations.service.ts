import axios from 'axios';

export async function getLocationsData() {
  return (await axios.get('/locations')).data;
}
