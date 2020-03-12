import { getLocations } from "../locations/locations.service";
import { Location, locationModel } from "../../models/locations.models";
import {
  Vehicle,
  VehicleMongo,
  VehicleSpeed,
  VehicleType,
  vehicleModel
} from "../../models/vehicles.models";
import { moveDate, rand } from "../../utils";
import { getDistanceBetween } from "../locations/router";

export async function getVehicles() {
  const vehicles = await vehicleModel
    .find()
    .catch<Vehicle[]>(e => console.log(e));
  return vehicles;
}

export async function getNearestVehicle(
  vehicleType: VehicleType,
  location: Location,
  date: Date
) {
  const vehicles = await vehicleModel
    .find({ type: vehicleType, "destination.name": location.name })
    .sort("arrivalDate")
    .catch<VehicleMongo[]>(e => console.log(e));
  const nearestVehicles = vehicles.filter(
    vehicle => vehicle.arrivalDate >= date
  );
  return nearestVehicles[0];
}

export async function assignVehicle(
  vehicle: VehicleMongo,
  destination: Location
) {
  const newVehicle: VehicleMongo = vehicle.toObject();
  const distance = await getDistanceBetween(
    newVehicle.destination.name,
    destination.name
  );
  const vehicleSpeed = VehicleSpeed[newVehicle.type];
  const arrivalDate = moveDate(newVehicle.arrivalDate, distance / vehicleSpeed);
  newVehicle.arrivalDate = arrivalDate;
  newVehicle.destination = destination;
  await vehicleModel.updateOne({ _id: newVehicle._id }, newVehicle);
  return newVehicle;
}

export async function regenerateVehicles() {
  const VEHICLES_NUMBER = 1000;
  const locations = await getLocations();
  const today = new Date();
  const vehicles: Vehicle[] = [];
  const vehicleTypes = Object.keys(VehicleType);
  for (let i = 0; i < VEHICLES_NUMBER; i++) {
    const destination = locations[rand(0, locations.length - 1)];
    const arrivalDate = new Date(
      today.getFullYear(),
      rand(today.getMonth(), 11),
      rand(today.getDate() + 1, 30)
    );
    const type = vehicleTypes[rand(0, vehicleTypes.length - 1)] as VehicleType;
    vehicles.push({ destination, arrivalDate, type });
  }
  await vehicleModel.deleteMany({});
  for (let vehicle of vehicles) {
    await vehicleModel.create(vehicle, (err: Error) => console.log(err));
  }
}
