import { v4 as uuidv4 } from "uuid";
import { upload } from "../../helper/FileStore.js";
import AboutPageSchema from "../../schema/aboutSchema/AboutPageSchema.js";


export const getAboutPage = async (req, res) => {
    try {
      const abouts = await AboutPageSchema.find();
  
      if (abouts.length === 0) {
        return res.status(404).json({ message: "No abouts found" });
      }
  
      return res.status(200).json({
        message: "abouts fetched successfully",
        abouts,
      });
    } catch (error) {
      console.error("GET HOME HEADER abouts ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

export const createAboutPage = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }

    const { name, description,description2 } = req.body;

    if (!name || !description || !req.file) {
      return res.status(400).json({ message: "Name, description, and image are required" });
    }

    try {
      const newAbout = await AboutPageSchema.create({
        id: uuidv4(),
        name,
        description,
        description2,
        image: req.file.path,
      });

      return res.status(201).json({
        message: "Home header slide created successfully",
        about: newAbout,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};


export const updateAboutPage = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to upload image", error: err.message });
    }

    const { id } = req.params;
    const { name, description, description2 } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    try {
      const existing = await AboutPageSchema.findOne({ id });
      if (!existing) {
        return res.status(404).json({ message: "About page not found" });
      }

      // Update fields
      existing.name = name;
      existing.description = description;
      existing.description2 = description2;

      // If a new image is provided, update it
      if (req.file) {
        existing.image = req.file.path;
      }

      await existing.save();

      return res.status(200).json({
        message: "About page updated successfully",
        about: existing,
      });
    } catch (error) {
      console.error("UPDATE ABOUT PAGE ERROR:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  });
};

export const deleteAboutPage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AboutPageSchema.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: "About page not found" });
    }

    return res.status(200).json({
      message: "About page deleted successfully",
      about: deleted,
    });
  } catch (error) {
    console.error("DELETE ABOUT PAGE ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
