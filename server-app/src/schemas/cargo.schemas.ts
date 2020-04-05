import * as mongoose from 'mongoose';

// Cargo Model
export const cargoSchema = new mongoose.Schema({
  description: String,
  category: String,
  mass: Number,
  volume: Number
});