import axios from 'axios';

async function changeTime(time: number): Promise<string> {
  const route = `/time/${time >= 0 ? 'plus' : 'minus'}/${Math.abs(time)}`;
  return (await axios.get(route)).data;
}

export default changeTime;
