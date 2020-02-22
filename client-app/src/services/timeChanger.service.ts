import axios from 'axios';

export async function changeTime(route: string) {
  return (await axios.get(route)).data;
}
