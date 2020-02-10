import * as mongoose from 'mongoose';
import { vehicleSchema } from './vehicles/vehicles.schemas';
import { locationSchema } from './locations/locations.schemas';

// Route Model
export const routeSchema = new mongoose.Schema({
  startLocation: locationSchema,
  endLocation: locationSchema,
  cargos: [String],
  departureDate: Date,
  vehicle: vehicleSchema
})