import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  descfirst: {
    type: String,
    required: true,
    trim: true,
  },
  descthird: {
    type: String,
    trim: true,
  },
  descsecond: {
    type: String,
    trim: true,
  },
  views: {
    type: Number,
    trim: true,
  },
  imagefirst: {
    type: String,
    required: true,
  },
  imagesecond: {
    type: String,
  },
  imagethird: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  }
  
});

export default mongoose.model(
  "BlogSchema",
  BlogSchema,
  "BlogSchemas"
);
