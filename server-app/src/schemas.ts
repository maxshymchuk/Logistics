import * as mongoose from 'mongoose';

// Location Model
export const locationSchema = new mongoose.Schema({
  name: String,
  coordinates: {
    north: Number,
    east: Number
  }
})

// Vehicle Model
export const vehicleSchema = new mongoose.Schema({
  destination: locationSchema,
  date: Date,
  type: String
})

// Route Model
export const routeSchema = new mongoose.Schema({
  startLocation: locationSchema,
  endLocation: locationSchema,
  cargos: [String],
  departureDate: Date,
  vehicle: vehicleSchema
})