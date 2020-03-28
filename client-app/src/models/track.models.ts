import { Route } from './route.models';

export enum TrackStatus {
  Pending = 'Pending',
  Transit = 'Transit',
  Completed = 'Completed'
}

export type Track = {
  _id?: string;
  route: Route;
  status: TrackStatus;
  departureDate: Date;
  arrivalDate: Date;
};
