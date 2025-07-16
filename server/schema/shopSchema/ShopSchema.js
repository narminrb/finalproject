import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
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
  },
  discountPrice: {
    type: Number,
  },
  painter: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  sale: {
    type: Boolean,
    required: true,
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
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model(
    "ShopSchema", 
    ShopSchema, 
    "ShopSchemas"
);
