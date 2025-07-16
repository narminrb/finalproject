import mongoose from "mongoose";

const BrandsSchema = new mongoose.Schema({
  id: {
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
  "BrandsSchema",
  BrandsSchema,
  "BrandsSchemas"
);
