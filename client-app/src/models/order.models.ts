import { Cargo } from './cargo.models';
import { Location, Segment } from './location.models';
import { Route } from './route.models';
import { Track } from './track.models';

export enum OrderStatus {
  Taken = 'Taken',
  Completed = 'Completed',
  Canceled = 'Canceled'
}

export type Order = {
  _id?: string;
  message: string;
  tracks: Track[];
  username: string;
  price: number;
  status: OrderStatus;
  routes: Route[];
  trackNumber: string;
};

type Departure = {
  place: Location;
  time: Date;
}

export type OrderUser = {
  locations: Segment | null;
  cargo: Cargo[];
  route: Route | null;
  departure: Departure | null;
  message: string;
  isPaid: boolean;
};

export const defaultOrderUser: OrderUser = {
  locations: null,
  cargo: [],
  route: null,
  departure: null,
  message: '',
  isPaid: false
}