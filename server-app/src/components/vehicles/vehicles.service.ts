import { errorMsg, successMsg } from '../../helpers/messages';
import { Location, LocationMongo } from '../../models/location.models';
import {
    Vehicle, vehicleModel, VehicleMongo, VehicleSpeed, VehicleType
} from '../../models/vehicle.models';
import { moveDate, rand } from '../../utils';
import { getLocations } from '../locations/locations.service';
import { getDistanceBetween } from '../locations/router';

async function findVehicleById(id: string) {
  const vehicle = await vehicleModel.findById(id);
  return vehicle;
}

export async function getVehicles() {
  try {
    const vehicles = await vehicleModel.find().sort("arrivalDate");
    if (vehicles.length) {
      return successMsg(vehicles);
    } else {
      return errorMsg('Cannot find vehicles');
    }
  } catch (err) {
    return errorMsg(`Error while getting vehicles (${err})`);
  }
}

export async function addVehicle(vehicle: Vehicle) {
  try {
    await vehicleModel.create(vehicle);
    return successMsg(`Vehicle "${vehicle.type}" successfully added`);
  } catch (err) {
    return errorMsg(`Cannot add "${vehicle.type}"`);
  }
}

export async function deleteVehicleById(id: string) {
  try {
    const vehicle = await findVehicleById(id);
    if (vehicle) {
      await vehicleModel.findByIdAndDelete(id);
      return successMsg(`Successful delete of "${vehicle.type}" (${id})`);
    } else {
      return errorMsg(`Cannot delete vehicle. Vehicle ID is not valid (${id})`);
    }
  } catch (err) {
    return errorMsg(`Error while deleting vehicle (${err})`);
  }
}

export async function getNearestVehicle(
  vehicleType: VehicleType,
  location: Location,
  date: Date
) {
  try {
    const vehicles = await vehicleModel
      .find({ type: vehicleType, "destination.name": location.name })
      .sort("arrivalDate");
    const nearestVehicles = vehicles.filter(
      vehicle => vehicle.arrivalDate >= date
    );
    return successMsg(nearestVehicles[0]);
  } catch (err) {
    return errorMsg(`Error while searching nearest vehicle (${err})`);
  }
}

export async function assignVehicle(
  vehicle: VehicleMongo,
  destination: Location
) {
  try {
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
    return successMsg(newVehicle);
  } catch (err) {
    return errorMsg(`Error while assigning vehicle (${err})`);
  }
}

export async function regenerateVehicles() {
  const VEHICLES_NUMBER = 1000;
  try {
    const locationsMsg = await getLocations();
    const locations = locationsMsg.data as LocationMongo[];
    const today = new Date();
    const vehicles: Vehicle[] = [];
    const vehicleTypes = Object.keys(VehicleType);
    for (let i = 0; i < VEHICLES_NUMBER; i++) {
      const destination = locations[rand(0, locations.length - 1)];
      const arrivalDate = new Date(
        today.getFullYear(),
        rand(today.getMonth(), today.getMonth() + 1),
        rand(today.getDate() + 1, 30)
      );
      const type = vehicleTypes[rand(0, vehicleTypes.length - 1)] as VehicleType;
      vehicles.push({ destination, arrivalDate, type });
    }
    await vehicleModel.deleteMany({});
    for (let vehicle of vehicles) {
      await vehicleModel.create(vehicle);
    }
    return successMsg('Successful regeneration of vehicles');
  } catch (err) {
    return errorMsg(`Error while regenerating vehicles (${err})`);
  }
}
