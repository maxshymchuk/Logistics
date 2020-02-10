import { Coordinate } from "./locations/locations.models";
import { VehicleType } from "./vehicles/vehicles.models";
import { getVehiclePriceRatio } from "./vehicles/vehicles.service";

export function cap(str: string) {
  str = str.toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
}

export function getDistanceBetween(point1: Coordinate, point2: Coordinate): number {
  const earthRadius = 6371e3;
  const angle1 = point1.lat * Math.PI / 180;
  const angle2 = point2.lat * Math.PI / 180;
  const deltaLat = (point2.lat - point1.lat) * Math.PI / 180;
  const deltaLon = (point2.lon - point1.lon) * Math.PI / 180;
  const a = 
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(angle1) * Math.cos(angle2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

export function computePrice(distance: number, vehicle: VehicleType): number {
  return distance * getVehiclePriceRatio(vehicle);
}