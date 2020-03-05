import * as fs from 'fs';
import * as mongoose from 'mongoose';
import CONSTS from '../const';
import {
  Coordinate,
  Location,
  LocationMongo,
  Map,
  MapMongo,
  MapType,
  Path,
  PathInput,
  PathfinderInput
} from './locations.models';
import { locationSchema, mapSchema } from './locations.schemas';
import { Route } from '../orders/orders.models';
import { VehicleType, VehicleSpeed } from '../vehicles/vehicles.models';

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
  return distance / CONSTS.METERS_PER_KILOMETER;
}

export async function getRoutesDistance(routes: Route[]) {
  let fullDistance = 0;
  for (let i = 0; i < routes.length; i++) {
    const distance = await getDistanceBetween(routes[i].startLocation.name, routes[i].endLocation.name);
    fullDistance += distance;
  }
  return fullDistance;
}

async function getCitiesDistance(cities: string[]) {
  let fullDistance = 0;
  for (let i = 0; i < cities.length; i++) {
    if (cities[i + 1]) {
      const distance = await getDistanceBetween(cities[i], cities[i + 1]);
      fullDistance += distance;
    }
  }
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

function getShortestPath(params: PathfinderInput) {
  let { numVertices, startVertex, endVertex, edges } = params;

  const path: number[] = [];

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
  path.unshift(startVertex);

  return path;
}

async function getAirplaneRoutes(from: string, to: string) {
  const routes = [from, to];
  const vehicle = VehicleType.Plane;
  const distance = await getDistanceBetween(from, to);
  const timeInterval = distance / VehicleSpeed[vehicle];
  const path: Path = { routes, distance, timeInterval, vehicle };
  return [path];
}

function getMapVehicle(map: MapType) {
  switch (map) {
    case MapType.Roads:
      return VehicleType.Car;
    case MapType.Railways:
      return VehicleType.Train;
    case MapType.Searoutes:
      return VehicleType.Ship;
  }
}

async function getRoutes(from: string, to: string, type: MapType) {
  const map = await mapModel.findOne({ type });
  const vehicle = getMapVehicle(type);

  const path: Path[] = [];

  const params = {
    startVertex: map.cities.indexOf(from),
    endVertex: map.cities.indexOf(to),
    numVertices: map.cities.length,
    edges: map.table.map(line => line.map(cell => (cell ? cell : Infinity)))
  };

  if (params.startVertex !== -1 && params.endVertex !== -1) {
    const routes = getShortestPath(params).map(route => map.cities[route]);
    const distance = await getCitiesDistance(routes);
    const timeInterval = distance / VehicleSpeed[vehicle];
    path.push({ routes, distance, timeInterval, vehicle });
  }

  return path;

  // if (params.startVertex === -1 || params.endVertex === -1) {
  //   const searoutes = await mapModel.findOne({ type: MapType.Searoutes });

  //   const startCity = params.startVertex === -1 ? params.endVertex : params.startVertex;
  //   const seaCities = map.cities.filter(rCity => searoutes.cities.includes(rCity));
  //   let shortest: { routes: string[]; distance: number } = {
  //     routes: [],
  //     distance: Infinity
  //   };
  //   for (let i = 0; i < seaCities.length; i++) {
  //     const startVertex = map.cities.indexOf(map.cities[startCity]);
  //     const endVertex = map.cities.indexOf(seaCities[i]);
  //     const routes = getShortestPath({
  //       numVertices,
  //       startVertex,
  //       endVertex,
  //       edges
  //     }).map(route => map.cities[route]);
  //     const fullDistance = await getCitiesDistance(routes);
  //     if (fullDistance < shortest.distance) {
  //       shortest.routes = routes;
  //       shortest.distance = fullDistance;
  //     }
  //   }
  //   path = [...shortest.routes];
  // }
}

export async function createPaths(pathInput: PathInput) {
  const { from, to } = pathInput;

  const paths: Path[][] = [];

  const airplaneRoutes = await getAirplaneRoutes(from, to);
  const carRoutes = await getRoutes(from, to, MapType.Roads);
  const trainRoutes = await getRoutes(from, to, MapType.Railways);
  const shipRoutes = await getRoutes(from, to, MapType.Searoutes);

  paths.push(airplaneRoutes, carRoutes, trainRoutes, shipRoutes);

  return paths;
}
