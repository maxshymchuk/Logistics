import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { Coordinate, Location, LocationMongo, Map, MapMongo, MapType } from './locations.models';
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

export async function getDistanceBetween(from: string, to: string) {
  const point1 = (await getLocationByName(from)).coordinates;
  const point2 = (await getLocationByName(to)).coordinates;
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

export async function getRoutesDistance(routes: Route[]) {
  let fullDistance = 0;
  routes.forEach(async route => {
    const distance = await getDistanceBetween(route.startLocation.name, route.endLocation.name);
    fullDistance += distance;
  });
  return fullDistance;
}

export async function regenerateLocations() {
  const cities: Location[] = JSON.parse((await fs.readFileSync('data/cities.json')).toString('utf8'));
  await locationModel.deleteMany({});
  cities.forEach(async city => {
    await locationModel.create(city, (err: Error) => err && console.log(err));
  });
}

export async function regenerateMaps() {
  const maps: Map[] = JSON.parse((await fs.readFileSync('data/maps.json')).toString('utf8'));
  await mapModel.deleteMany({});
  maps.forEach(async map => {
    await mapModel.create(map, (err: Error) => err && console.log(err));
  });
}

export async function shortestPath(from: string, to: string, type: MapType) {
  const roads = await mapModel.findOne({ type });
  const numVertices = roads.cities.length;
  const edges = roads.table.map(i1 => i1.map(i2 => (i2 ? i2 : Infinity)));
  const startVertex = roads.cities.indexOf(from);
  let endVertex = roads.cities.indexOf(to);
  const path = [];

  if (startVertex !== -1 && endVertex !== -1) {
    let done = new Array<boolean>(numVertices).fill(false);
    done[startVertex] = true;
    let pathLengths = new Array<number>(numVertices);
    let predecessors = new Array<number>(numVertices);
    for (let i = 0; i < numVertices; i++) {
      pathLengths[i] = edges[startVertex][i];
      if (edges[startVertex][i] != Infinity) {
        predecessors[i] = startVertex;
      }
    }
    pathLengths[startVertex] = 0;
    for (let i = 0; i < numVertices - 1; i++) {
      let closest = -1;
      let closestDistance = Infinity;
      for (let j = 0; j < numVertices; j++) {
        if (!done[j] && pathLengths[j] < closestDistance) {
          closestDistance = pathLengths[j];
          closest = j;
        }
      }
      done[closest] = true;
      for (let j = 0; j < numVertices; j++) {
        if (!done[j]) {
          let possiblyCloserDistance = pathLengths[closest] + edges[closest][j];
          if (possiblyCloserDistance < pathLengths[j]) {
            pathLengths[j] = possiblyCloserDistance;
            predecessors[j] = closest;
          }
        }
      }
    }
    while (endVertex != startVertex) {
      path.unshift(endVertex);
      endVertex = predecessors[endVertex];
    }
  }
  return path;
}
