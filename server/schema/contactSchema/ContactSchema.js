import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model(
  "ContactSchema",
  ContactSchema,
  "ContactSchemas"
);
