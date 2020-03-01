import * as mongoose from 'mongoose';
import CONSTS from './../const';
import { getDistanceBetween, getLocations } from '../locations/locations.service';
import { Location } from '../locations/locations.models';
import { Vehicle, VehicleMongo, VehicleSpeed, VehicleType } from './vehicles.models';
import { vehicleSchema } from './vehicles.schemas';

const vehicleModel = mongoose.model<VehicleMongo>('vehicles', vehicleSchema);

function rand(a: number, b: number) {
  return Math.round(Math.random() * (b - a) + a);
}

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
    .sort('arrivalDate')
    .catch<VehicleMongo[]>(e => console.log(e));
  return vehicles.filter(vehicle => vehicle.arrivalDate >= date)[0];
}

export async function assignVehicle(vehicle: VehicleMongo, destination: Location) {
  const newVehicle: VehicleMongo = vehicle.toObject();
  const distance =
    (await getDistanceBetween(newVehicle.destination.name, destination.name)) / CONSTS.METERS_PER_KILOMETER;
  const vehicleSpeed = VehicleSpeed[newVehicle.type];
  const arrivalDate = getArrivalDate(newVehicle.arrivalDate, distance / vehicleSpeed);
  newVehicle.arrivalDate = arrivalDate;
  newVehicle.destination = destination;
  await vehicleModel.updateOne({ _id: newVehicle._id }, newVehicle);
  return newVehicle;
}

export async function regenerateVehicles() {
  const VEHICLES_NUMBER = 100;
  const locations = await getLocations();
  const today = new Date();
  const vehicles: Vehicle[] = [];
  const vehicleTypes = Object.keys(VehicleType);
  for (let i = 0; i < VEHICLES_NUMBER; i++) {
    vehicles.push({
      destination: locations[rand(0, locations.length - 1)],
      arrivalDate: new Date(today.getFullYear(), rand(today.getMonth(), 11), rand(today.getDate() + 1, 30)),
      type: vehicleTypes[rand(0, vehicleTypes.length - 1)] as VehicleType
    });
  }
  await vehicleModel.deleteMany({});
  vehicles.forEach(async vehicle => {
    await vehicleModel.create(vehicle, (err: Error) => console.log(err));
  });
}
