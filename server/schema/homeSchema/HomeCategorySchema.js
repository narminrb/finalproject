import mongoose from "mongoose";

const HomeCategory = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model(
  "HomeCategory",
  HomeCategory,
  "HomeCategories"
);
