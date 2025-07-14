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


