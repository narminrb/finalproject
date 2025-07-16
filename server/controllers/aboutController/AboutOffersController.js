import { v4 as uuidv4 } from "uuid";
import { upload } from "../../helper/FileStore.js";
import AboutOffersSchema from "../../schema/aboutSchema/AboutOffersSchema.js";


export const getAboutOffers = async (req, res) => {
    try {
      const abouts = await AboutOffersSchema.find();
  
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

export const createAboutOffers = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }
    const { name, description } = req.body;

    if (!name || !description || !req.file) {
      return res.status(400).json({ message: "Name, description, and image are required" });
    }

    try {
      const newAbout = await AboutOffersSchema.create({
        id: uuidv4(),
        name,
        description,
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


