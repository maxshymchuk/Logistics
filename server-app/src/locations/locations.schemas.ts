import * as mongoose from 'mongoose';
import { MapType } from './locations.models';

// Location Model
export const locationSchema = new mongoose.Schema({
  name: String,
  coordinates: {
    lat: Number,
    lon: Number
  }
});

// Map Model
export const mapSchema = new mongoose.Schema({
  type: {
    type: String,
    default: MapType.Roads
  },
  cities: [String],
  table: [[Number]]
});
