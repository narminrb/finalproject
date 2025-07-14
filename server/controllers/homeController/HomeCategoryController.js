import { v4 as uuidv4 } from "uuid";
import { upload } from "../../helper/FileStore.js";
import HomeCategorySchema from "../../schema/homeSchema/HomeCategorySchema.js";


export const getHomeCategory = async (req, res) => {
    try {
      const categories = await HomeCategorySchema.find();
  
      if (categories.length === 0) {
        return res.status(404).json({ message: "No categories  found" });
      }
  
      return res.status(200).json({
        message: "Categories  fetched successfully",
        categories,
      });
    } catch (error) {
      console.error("GET HOME HEADER Categories  ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

export const createHomeCategory = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }

    const { category } = req.body;

    if (!category || !req.file) {
      return res.status(400).json({ message: "Category, and image are required" });
    }

    try {
      const newCategory = await HomeCategorySchema.create({
        id: uuidv4(),
        category,
        image: req.file.path,
      });

      return res.status(201).json({
        message: "Home category created successfully",
        category: newCategory,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};


