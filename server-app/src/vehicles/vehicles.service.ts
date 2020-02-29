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
  const distance = getDistanceBetween(newVehicle.destination.coordinates, destination.coordinates) / CONSTS.METERS_PER_KILOMETER;
  const vehicleSpeed = VehicleSpeed[newVehicle.type];
  const arrivalDate = getArrivalDate(newVehicle.arrivalDate, distance / vehicleSpeed);
  newVehicle.arrivalDate = arrivalDate;
  newVehicle.destination = destination;
  await vehicleModel.updateOne({ _id: newVehicle._id }, newVehicle);
  return newVehicle;
}

export async function regenerateVehicles() {
  const AMOUNT = 100;
  const locations = await getLocations();
  const vehicles: Array<any> = [];
  const today = new Date();
  for (let i = 0; i < AMOUNT; i++) {
    vehicles.push({
      destination: locations[rand(0, locations.length - 1)],
      arrivalDate: +new Date(today.getFullYear(), rand(today.getMonth(), 11), rand(today.getDate(), 30)),
      type: [VehicleType.Car, VehicleType.Plane, VehicleType.Train][rand(0, 2)]
    });
  }
  await vehicleModel.deleteMany({});
  vehicles.forEach(async vehicle => {
    await vehicleModel.create(vehicle, (err: Error) => err && console.log(err));
  });
}
