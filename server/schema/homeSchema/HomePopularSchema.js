import mongoose from "mongoose";

const HomePopularSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  discountPrice: {
    type: Number,
    trim: true,
  },
  painter: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "HomeCategory",  
    required: true,
  },
  rating: {
    type: Number, 
    required: false,
    default: 0,
    min: 0,
    max: 5,
  }
});

export default mongoose.model(
  "HomePopular",
  HomePopularSchema,
  "HomePopulars"
);
