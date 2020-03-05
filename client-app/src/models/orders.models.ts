import { Route } from './routes.models';
import { Track } from './tracks.models';

export enum OrderStatus {
  Taken = 'Taken',
  Completed = 'Completed',
  Canceled = 'Canceled'
}

export type Order = {
  _id?: string;
  message: string;
  tracks: Track[];
  userLogin: string;
  price: number;
  status: OrderStatus;
  routes: Route[];
  trackNumber: string;
};

export type OrderUser = {
  from: string;
  to: string;
  cargos: string[];
  message: string;
};
