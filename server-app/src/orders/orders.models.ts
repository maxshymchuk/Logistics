import { Destination } from "../models";

export type Track = {
  description: string,
  path: string,
  userId: string,
  price: number,
  destinations: Array<Destination>
}