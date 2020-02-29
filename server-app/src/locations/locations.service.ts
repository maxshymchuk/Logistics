import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { Coordinate, Location, LocationMongo } from './locations.models';
import { locationSchema } from './locations.schemas';
import { Route } from '../orders/orders.models';

const locationModel = mongoose.model<LocationMongo>('locations', locationSchema);

export async function getLocations() {
  const locations = await locationModel.find().catch<Location[]>(e => console.log(e));
  return locations;
}

export async function getLocationByName(name: string) {
  const location = await locationModel.findOne({ name }).catch<Location>(e => console.log(e));
  return location;
}

export function getDistanceBetween(point1: Coordinate, point2: Coordinate) {
  const earthRadius = 6371e3;
  const angle1 = (point1.lat * Math.PI) / 180;
  const angle2 = (point2.lat * Math.PI) / 180;
  const deltaLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const deltaLon = ((point2.lon - point1.lon) * Math.PI) / 180;
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(angle1) * Math.cos(angle2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

export function getRoutesDistance(routes: Route[]) {
  let fullDistance = 0;
  routes.forEach(route => {
    fullDistance += getDistanceBetween(route.startLocation.coordinates, route.endLocation.coordinates);
  });
  return fullDistance;
}

export async function regenerateLocations() {
  const cities: Array<any> = JSON.parse((await fs.readFileSync('src/locations/cities.json')).toString('utf8'));
  await locationModel.deleteMany({});
  cities.forEach(async city => {
    await locationModel.create(city, (err: Error) => err && console.log(err));
  });
}
