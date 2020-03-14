import axios from "axios";

// TODO: unclear name
// TODO: this function should construct route
export async function changeTime(route: string) {
  return (await axios.get(route)).data;
}
