import mongoose from "mongoose";

const AboutPageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
  },
  description2: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model(
  "AboutPageSchema",
  AboutPageSchema,
  "AboutPageSchemas"
);
