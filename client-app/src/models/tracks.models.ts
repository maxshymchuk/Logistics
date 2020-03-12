import { Location } from "./locations.models";
import { Route } from "./routes.models";
import { Vehicle } from "./vehicles.models";

export enum TrackStatus {
  Pending = "pending",
  Transit = "transit",
  Completed = "completed"
}

export type Track = {
  _id?: string;
  route: Route;
  status: TrackStatus;
  departureDate: Date;
  arrivalDate: Date;
};
