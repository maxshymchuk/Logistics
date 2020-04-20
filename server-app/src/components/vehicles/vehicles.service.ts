import { errorResponse, successResponse } from '../../helpers/response';
import { Location } from '../../models/location.models';
import { MessageType } from '../../models/message.models';
import {
    Vehicle, vehicleModel, VehicleMongo, VehicleSpeed, VehicleType, VehicleTypes
} from '../../models/vehicle.models';
import { moveDate, rand } from '../../helpers/utils';
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
      return successResponse('Success', vehicles);
    } else {
      return errorResponse('Cannot find vehicles');
    }
  } catch (err) {
    return errorResponse(`Error while getting vehicles (${err})`);
  }
}

export async function addVehicle(vehicle: Vehicle) {
  try {
    await vehicleModel.create(vehicle);
    return successResponse(`Vehicle "${vehicle.type}" successfully added`);
  } catch (err) {
    return errorResponse(`Cannot add "${vehicle.type}"`);
  }
}

export async function deleteVehicleById(id: string) {
  try {
    const vehicle = await findVehicleById(id);
    if (vehicle) {
      await vehicleModel.findByIdAndDelete(id);
      return successResponse(`Successful delete of "${vehicle.type}" (${id})`);
    } else {
      return errorResponse(`Cannot delete vehicle. Vehicle ID is not valid (${id})`);
    }
  } catch (err) {
    return errorResponse(`Error while deleting vehicle (${err})`);
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
    return successResponse('Success', nearestVehicles[0]);
  } catch (err) {
    return errorResponse(`Error while searching nearest vehicle (${err})`);
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
    return successResponse('Success', newVehicle);
  } catch (err) {
    return errorResponse(`Error while assigning vehicle (${err})`);
  }
}

export async function regenerateVehicles() {
  const VEHICLES_NUMBER = 1000;
  try {
    const locationsResponse = await getLocations();
    if (locationsResponse.messageType === MessageType.Error) {
      throw locationsResponse.message;
    }
    const locations = locationsResponse.data;
    const today = new Date();
    const vehicles: Vehicle[] = [];
    for (let i = 0; i < VEHICLES_NUMBER; i++) {
      const destination = locations[rand(0, locations.length - 1)];
      const arrivalDate = new Date(
        today.getFullYear(),
        rand(today.getMonth(), today.getMonth() + 1),
        rand(today.getDate() + 1, 30)
      );
      const type = VehicleTypes[rand(0, VehicleTypes.length - 1)];
      vehicles.push({ destination, arrivalDate, type });
    }
    await vehicleModel.deleteMany({});
    for (let vehicle of vehicles) {
      await vehicleModel.create(vehicle);
    }
    return successResponse('Successful regeneration of vehicles');
  } catch (err) {
    return errorResponse(`Error while regenerating vehicles (${err})`);
  }
}
