import axios from 'axios';

import { ServerResponse } from '../../models/message.models';

async function changeTime(time: number) {
  const route = `/time/${time >= 0 ? 'plus' : 'minus'}/${Math.abs(time)}`;
  const response: ServerResponse = (await axios.get(route)).data;
  return response;
}

export default changeTime;
