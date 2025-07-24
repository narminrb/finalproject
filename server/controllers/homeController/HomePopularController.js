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
      inStock,
      sale,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !painter ||
      !size ||
      inStock === undefined ||
      sale === undefined ||
      !category ||
      !req.file
    ) {
      return res.status(400).json({ message: "All required fields must be provided including image, inStock, and sale" });
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
        inStock: inStock === "true" || inStock === true, 
        sale: sale === "true" || sale === true,
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

export const deleteHomePopular = async (req, res) => {
  try {
    const { id } = req.params; // route: /homepopular/:id

    const deleted = await HomePopularSchema.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: "Popular item not found" });
    }

    return res.status(200).json({
      message: "Popular item deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("DELETE HOME POPULAR ITEM ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateHomePopular = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }

    const { id } = req.params; // route: /homepopular/:id
    const {
      name,
      description,
      price,
      discountPrice,
      painter,
      size,
      rating,
      category,
      inStock,
      sale,
    } = req.body;

    try {
      const existing = await HomePopularSchema.findOne({ id });
      if (!existing) {
        return res.status(404).json({ message: "Popular item not found" });
      }

      // build update data dynamically
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (price !== undefined) updateData.price = price;
      if (discountPrice !== undefined) updateData.discountPrice = discountPrice;
      if (painter !== undefined) updateData.painter = painter;
      if (size !== undefined) updateData.size = size;
      if (category !== undefined) updateData.category = category;
      if (rating !== undefined) updateData.rating = rating;
      if (inStock !== undefined)
        updateData.inStock = inStock === "true" || inStock === true;
      if (sale !== undefined)
        updateData.sale = sale === "true" || sale === true;
      if (req.file) updateData.image = req.file.path;

      const updated = await HomePopularSchema.findOneAndUpdate(
        { id },
        updateData,
        { new: true }
      );

      return res.status(200).json({
        message: "Popular item updated successfully",
        data: updated,
      });
    } catch (error) {
      console.error("UPDATE HOME POPULAR ITEM ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};
