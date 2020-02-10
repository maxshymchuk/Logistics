import * as mongoose from 'mongoose';

// Location Model
export const locationSchema = new mongoose.Schema({
  name: String,
  coordinates: {
    lat: Number,
    lon: Number
  }
})