import * as mongoose from 'mongoose';

// News Model
export const newsSchema = new mongoose.Schema({
  date: Date,
  image: String,
  title: String,
  source: String
});