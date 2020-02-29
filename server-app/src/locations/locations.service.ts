import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { Coordinate, Location, LocationMongo, Map, MapMongo } from './locations.models';
import { locationSchema, mapSchema } from './locations.schemas';
import { Route } from '../orders/orders.models';

const locationModel = mongoose.model<LocationMongo>('locations', locationSchema);
const mapModel = mongoose.model<MapMongo>('maps', mapSchema);

export async function getLocations() {
  const locations = await locationModel.find().catch<Location[]>(e => console.log(e));
  return locations;
}

export async function getLocationByName(name: string) {
  const location = await locationModel.findOne({ name }).catch<Location>(e => console.log(e));
  return location;
}

export function getDistanceBetween(point1: Coordinate, point2: Coordinate) {
  const EARTH_RADIUS = 6371e3;
  const PI_DEGREES = 180;
  const angle1 = (point1.lat * Math.PI) / PI_DEGREES;
  const angle2 = (point2.lat * Math.PI) / PI_DEGREES;
  const deltaLat = ((point2.lat - point1.lat) * Math.PI) / PI_DEGREES;
  const deltaLon = ((point2.lon - point1.lon) * Math.PI) / PI_DEGREES;
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(angle1) * Math.cos(angle2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS * c;
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
  const cities: Location[] = JSON.parse((await fs.readFileSync('data/cities.json')).toString('utf8'));
  await locationModel.deleteMany({});
  cities.forEach(async city => {
    await locationModel.create(city, (err: Error) => console.log(err));
  });
}

export async function regenerateMaps() {
  const maps: Map[] = JSON.parse((await fs.readFileSync('data/maps.json')).toString('utf8'));
  await mapModel.deleteMany({});
  maps.forEach(async map => {
    await mapModel.create(map, (err: Error) => console.log(err));
  });
}
