import * as mongoose from 'mongoose';
import CONSTS from './../const';
import { cap } from '../utils';
import { getDistanceBetween } from '../locations/locations.service';
import { Location } from '../locations/locations.models';
import { Vehicle, VehicleMongo, VehiclePriceRatio, VehicleSpeed, VehicleType } from './vehicles.models';
import { vehicleSchema } from './vehicles.schemas';

const vehicleModel = mongoose.model<VehicleMongo>('vehicles', vehicleSchema);

function getArrivalDate(current: Date, hours: number) {
  return new Date(current.getTime() + hours * CONSTS.HOUR_MILLISEC);
}

export async function getVehicles() {
  const vehicles = await vehicleModel.find().catch<Vehicle[]>(e => console.log(e));
  return vehicles;
}

export async function getNearestVehicle(vehicleType: VehicleType, location: Location, date: Date) {
  const vehicles = await vehicleModel
    .find({ type: vehicleType, 'destination.name': location.name })
    .sort('date')
    .catch<Vehicle[]>(e => console.log(e));
  return vehicles.filter(vehicle => vehicle.arrivalDate > date)[0];
}

export function assignVehicle(vehicle: Vehicle, destination: Location) {
  const newVehicle = Object.assign({}, vehicle);
  const distance =
    getDistanceBetween(vehicle.destination.coordinates, destination.coordinates) / CONSTS.METERS_PER_KILOMETER;
  const vehicleSpeed = getVehicleSpeed(vehicle.type);
  const arrivalDate = getArrivalDate(vehicle.arrivalDate, distance / vehicleSpeed);
  newVehicle.arrivalDate = arrivalDate;
  newVehicle.destination = destination;
  return newVehicle;
}

export function getVehicleType(name: string) {
  return VehicleType[cap(name) as VehicleType];
}

export function getVehicleSpeed(name: string) {
  return VehicleSpeed[cap(name) as VehicleType];
}

export function getVehiclePriceRatio(name: string) {
  return VehiclePriceRatio[cap(name) as VehicleType];
}
