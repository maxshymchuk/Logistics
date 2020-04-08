import { Cargo } from './cargo.models';
import { Segment } from './location.models';
import { UserPath } from './path.models';
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
  takenTime: Date;
  isPaid: boolean;
};

export type OrderPaths = {
  from: string;
  to: string;
  cargo: Cargo[];
  message: string;
};

export type OrderUser = {
  locations: Segment | null;
  cargo: Cargo[];
  path: UserPath | null;
  message: string;
  isPaid: boolean;
};

export const defaultOrderUser: OrderUser = {
  locations: null,
  cargo: [],
  path: null,
  message: '',
  isPaid: false
};