import mongoose from "mongoose";

const ContactElementsSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model(
  "ContactElementsSchema",
  ContactElementsSchema,
  "ContactElementsSchemas"
);
