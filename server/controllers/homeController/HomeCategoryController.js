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


export const deleteHomeCategory = async (req, res) => {
  try {
    const { id } = req.params; // assuming route like /home-category/:id

    const deleted = await HomeCategorySchema.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully", category: deleted });
  } catch (error) {
    console.error("DELETE HOME CATEGORY ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updateHomeCategory = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }

    const { id } = req.params; // assuming route like /home-category/:id
    const { category } = req.body;

    try {
      // Find the existing document first
      const existing = await HomeCategorySchema.findOne({ id });
      if (!existing) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Build update fields
      const updateData = {};
      if (category) updateData.category = category;
      if (req.file) updateData.image = req.file.path;

      const updated = await HomeCategorySchema.findOneAndUpdate(
        { id },
        updateData,
        { new: true }
      );

      return res.status(200).json({ message: "Category updated successfully", category: updated });
    } catch (error) {
      console.error("UPDATE HOME CATEGORY ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};
