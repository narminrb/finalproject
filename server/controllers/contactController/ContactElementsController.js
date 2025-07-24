import { v4 as uuidv4 } from "uuid";
import { upload } from "../../helper/FileStore.js";
import ContactElementsSchema from "../../schema/contactSchema/ContactElementsSchema.js";


export const getContactElement = async (req, res) => {
    try {
      const elements = await ContactElementsSchema.find();
  
      if (elements.length === 0) {
        return res.status(404).json({ message: "No elements found" });
      }
      return res.status(200).json({
        message: "elements fetched successfully",
        elements,
      });
    } catch (error) {
      console.error("GET HOME HEADER elements ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

export const createContactElement = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }
    const { name, description } = req.body;

    if (!name || !description || !req.file) {
      return res.status(400).json({ message: "Name, description, and image are required" });
    }

    try {
      const newAbout = await ContactElementsSchema.create({
        id: uuidv4(),
        name,
        description,
        image: req.file.path,
      });

      return res.status(201).json({
        message: "Home header slide created successfully",
        element: newAbout,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

export const updateContactElement = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to upload image", error: err.message });
    }

    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    try {
      const existing = await ContactElementsSchema.findOne({ id });
      if (!existing) {
        return res.status(404).json({ message: "Contact element not found" });
      }

      existing.name = name;
      existing.description = description;

      if (req.file) {
        existing.image = req.file.path;
      }

      await existing.save();

      return res.status(200).json({
        message: "Contact element updated successfully",
        element: existing,
      });
    } catch (error) {
      console.error("UPDATE CONTACT ELEMENT ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

export const deleteContactElement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContactElementsSchema.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: "Contact element not found" });
    }

    return res.status(200).json({
      message: "Contact element deleted successfully",
      element: deleted,
    });
  } catch (error) {
    console.error("DELETE CONTACT ELEMENT ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



