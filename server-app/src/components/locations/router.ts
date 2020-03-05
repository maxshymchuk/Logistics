import CONSTS from '../../const';
import { MapType, mapModel, Path } from '../../models/locations.models';
import { VehicleType, VehicleSpeed } from '../../models/vehicles.models';
import { pathfinder } from './pathfinder';
import { Route } from '../../models/routes.models';
import { getLocationByName } from './locations.service';
import { calculatePrice } from './calculator';

function getMapVehicle(mapType: MapType) {
  switch (mapType) {
    case MapType.Roads:
      return VehicleType.Car;
    case MapType.Railways:
      return VehicleType.Train;
    case MapType.Searoutes:
      return VehicleType.Ship;
  }
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

async function getNearestCityPath(from: string, sourceMapType: MapType, targetMapType: MapType) {
  const sourceMap = await mapModel.findOne({ mapType: sourceMapType });
  const targetMap = await mapModel.findOne({ mapType: targetMapType });

  const commonCities = sourceMap.cities.filter(city => targetMap.cities.includes(city)).filter(city => city !== from);

  const nearestCity: { routes: string[]; distance: number } = {
    routes: [],
    distance: Infinity
  };

  for (let i = 0; i < commonCities.length; i++) {
    const startVertex = sourceMap.cities.indexOf(from);
    const endVertex = sourceMap.cities.indexOf(commonCities[i]);
    const numVertices = sourceMap.cities.length;
    const edges = sourceMap.table.map(line => line.map(cell => (cell ? cell : Infinity)));
    if (startVertex === -1 || endVertex === -1) break;
    const routes = pathfinder({ numVertices, startVertex, endVertex, edges }).map(route => sourceMap.cities[route]);
    const fullDistance = await getCitiesDistance(routes);
    if (fullDistance < nearestCity.distance) {
      nearestCity.routes = routes;
      nearestCity.distance = fullDistance;
    }
  }
  return nearestCity;
}

export async function getRoutesDistance(routes: Route[]) {
  let fullDistance = 0;
  for (let i = 0; i < routes.length; i++) {
    const distance = await getDistanceBetween(routes[i].startLocation.name, routes[i].endLocation.name);
    fullDistance += distance;
  }
  return fullDistance;
}

export async function getAirplaneRoutes(from: string, to: string) {
  const routes = [from, to];
  const vehicle = VehicleType.Plane;
  const distance = await getDistanceBetween(from, to);
  const timeInterval = distance / VehicleSpeed[vehicle];
  const price = calculatePrice(distance, vehicle);
  const path: Path = { routes, distance, timeInterval, vehicle, price };
  return [path];
}

export async function getRoutes(from: string, to: string, mapType: MapType) {
  const map = await mapModel.findOne({ mapType });
  const vehicle = getMapVehicle(mapType);

  const path: Path[] = [];

  const params = {
    startVertex: map.cities.indexOf(from),
    endVertex: map.cities.indexOf(to),
    numVertices: map.cities.length,
    edges: map.table.map(line => line.map(cell => (cell ? cell : Infinity)))
  };

  if (params.startVertex !== -1 && params.endVertex !== -1) {
    const routes = pathfinder(params).map(route => map.cities[route]);
    const distance = await getCitiesDistance(routes);
    const timeInterval = distance / VehicleSpeed[vehicle];
    const price = calculatePrice(distance, vehicle);
    path.push({ routes, distance, timeInterval, vehicle, price });
  } else if (params.startVertex === -1 || params.endVertex === -1) {
    const targetMapType = mapType === MapType.Searoutes ? MapType.Roads : MapType.Searoutes;
    const { routes, distance } = await getNearestCityPath(from, mapType, targetMapType);
    const price = calculatePrice(distance, vehicle);
    if (routes.length) {
      const lastRoute = await getRoutes(routes[routes.length - 1], to, targetMapType);
      const timeInterval = distance / VehicleSpeed[vehicle];
      path.push({ routes, distance, timeInterval, vehicle, price }, ...lastRoute);
    }
  }
  return path;
}
