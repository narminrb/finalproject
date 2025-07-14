// const mongoose = require('mongoose');

// const headerSlideSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   image: { type: String }, // store image filename or full URL
// }, 
// { timestamps: true });

// module.exports = mongoose.model('HeaderSlide', headerSlideSchema);
import mongoose from "mongoose";

const headerSlideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model(
  "HeaderSlide",
  headerSlideSchema,
  "HeaderSlides"
);
