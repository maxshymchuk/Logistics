import { Route } from './routes.models';

export enum TrackStatus {
  Pending = 'Pending',
  Transit = 'Transit',
  Completed = 'Completed'
}

export type Track = {
  route: Route;
  status: TrackStatus;
  departureDate: Date;
  arrivalDate: Date;
};
