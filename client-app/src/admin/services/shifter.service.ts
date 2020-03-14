import axios from 'axios';

export async function changeTime(time: number) {
  const route = `/time/${time >= 0 ? 'plus' : 'minus'}/${Math.abs(time)}`;
  return (await axios.get(route)).data;
}
