import { v4 as uuidv4 } from "uuid";
import { upload } from "../../helper/FileStore.js";
import HomePopularSchema from "../../schema/homeSchema/HomePopularSchema.js";


export const getHomePopular = async (req, res) => {
  try {
    const popularItems = await HomePopularSchema.find().populate("category");

    if (popularItems.length === 0) {
      return res.status(404).json({ message: "No popular items found" });
    }

    return res.status(200).json({
      message: "Popular items fetched successfully",
      data: popularItems,
    });
  } catch (error) {
    console.error("GET HOME POPULAR ITEMS ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const createHomePopular = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }

    const {
      name,
      description,
      price,
      discountPrice,
      painter,
      size,
      rating,
      category, 
    } = req.body;

    if (!name || !description || !price || !painter || !size || !category || !req.file) {
      return res.status(400).json({ message: "All fields and image are required" });
    }

    try {
      const newItem = await HomePopularSchema.create({
        id: uuidv4(),
        name,
        description,
        price,
        discountPrice,
        painter,
        size,
        image: req.file.path,
        category,
        rating: rating || 0,
      });

      return res.status(201).json({
        message: "Home popular item created successfully",
        data: newItem,
      });
    } catch (error) {
      console.error("CREATE HOME POPULAR ITEM ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};
