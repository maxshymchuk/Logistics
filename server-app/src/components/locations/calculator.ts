import { VehiclePriceRatio, VehicleType } from '../../models/vehicle.models';

export function calculatePrice(distance: number, vehicleType: VehicleType) {
  return +(distance * VehiclePriceRatio[vehicleType]).toFixed(2);
}
