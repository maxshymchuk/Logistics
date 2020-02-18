import axios from 'axios';

export async function getUsersData() {
  return (await axios.get('/users')).data;
}
