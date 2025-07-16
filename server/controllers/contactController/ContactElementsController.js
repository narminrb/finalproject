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


