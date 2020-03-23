import * as mongoose from 'mongoose';

// Testimonials Model
export const testimonialsSchema = new mongoose.Schema({
  date: Date,
  reviewer: Number,
  reviewersPhotos: [String],
  text: String
});