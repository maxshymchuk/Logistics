import * as mongoose from "mongoose";

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
  mapType: String,
  cities: [String],
  table: [[Number]]
});
