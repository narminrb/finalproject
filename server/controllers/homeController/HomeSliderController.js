import HomeHeaderSliderSchema from "../../schema/homeSchema/HeaderSliderSchema.js";
import { v4 as uuidv4 } from "uuid";
import { upload } from "../../helper/FileStore.js";


export const getHomeHeaderSliderController = async (req, res) => {
    try {
      const slides = await HomeHeaderSliderSchema.find();
  
      if (slides.length === 0) {
        return res.status(404).json({ message: "No slides found" });
      }
  
      return res.status(200).json({
        message: "Slides fetched successfully",
        slides,
      });
    } catch (error) {
      console.error("GET HOME HEADER SLIDES ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

export const createHomeHeaderSliderController = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }

    const { name, description } = req.body;

    if (!name || !description || !req.file) {
      return res.status(400).json({ message: "Name, description, and image are required" });
    }

    try {
      const newSlide = await HomeHeaderSliderSchema.create({
        id: uuidv4(),
        name,
        description,
        image: req.file.path,
      });

      return res.status(201).json({
        message: "Home header slide created successfully",
        slide: newSlide,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};


export const deleteHomeHeaderSliderController = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HomeHeaderSliderSchema.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Slide not found" });
    }

    return res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    console.error("DELETE HOME HEADER SLIDE ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateHomeHeaderSliderController = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }

    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const slide = await HomeHeaderSliderSchema.findById(id);

      if (!slide) {
        return res.status(404).json({ message: "Slide not found" });
      }

      if (name) slide.name = name;
      if (description) slide.description = description;
      if (req.file) slide.image = req.file.path;

      await slide.save();

      return res.status(200).json({ message: "Slide updated successfully", slide });
    } catch (error) {
      console.error("UPDATE HOME HEADER SLIDE ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

