import { v4 as uuidv4 } from "uuid";
import { upload } from "../../helper/FileStore.js";
import ShopSchema from "../../schema/shopSchema/ShopSchema.js";

export const getShopItems = async (req, res) => {
  try {
    const shopItems = await ShopSchema.find().populate("category");

    if (shopItems.length === 0) {
      return res.status(404).json({ message: "No shop items found" });
    }

    return res.status(200).json({
      message: "Shop items fetched successfully",
      data: shopItems,
    });
  } catch (error) {
    console.error("GET SHOP ITEMS ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createShopItem = (req, res) => {
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
      return res.status(400).json({
        message: "All required fields must be provided including image, inStock, and sale",
      });
    }

    try {
      const newItem = await ShopSchema.create({
        id: uuidv4(),
        name,
        description,
        price,
        discountPrice,
        painter,
        size,
        image: req.file.path,
        category,
        inStock: inStock === "true" || inStock === true,
        sale: sale === "true" || sale === true,
      });

      return res.status(201).json({
        message: "Shop product created successfully",
        data: newItem,
      });
    } catch (error) {
      console.error("CREATE SHOP ITEM ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

//  export const getShopPageId = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       const shopItem = await ShopSchema.findOne({ id: id });
  
//       if (!shopItem) {
//         return res.status(404).json({ message: "Shop item not found" });
//       }
  
//       return res.status(200).json(shopItem);
//     } catch (error) {
//       console.error("GET SHOP ITEM BY ID ERROR:", error);
//       return res.status(500).json({ message: "Server error", error: error.message });
//     }
//   };

export const getShopPageId = async (req, res) => {
  try {
    const { id } = req.params;

    const shopItem = await ShopSchema.findOne({ id: id }).populate("category");

    if (!shopItem) {
      return res.status(404).json({ message: "Shop item not found" });
    }

    return res.status(200).json(shopItem);
  } catch (error) {
    console.error("GET SHOP ITEM BY ID ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
