import { v4 as uuidv4 } from "uuid";
import { upload } from "../../helper/FileStore.js";
import BrandsSchema from "../../schema/Brands/BrandsSchema.js";


export const getBrands = async (req, res) => {
    try {
      const brands = await BrandsSchema.find();
  
      if (brands.length === 0) {
        return res.status(404).json({ message: "No brands found" });
      }
      return res.status(200).json({
        message: "brands fetched successfully",
        brands,
      });
    } catch (error) {
      console.error("GET HOME HEADER brands ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

export const createBrands = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to upload image", error: err.message });
    }

    try {
      const newBrand = await BrandsSchema.create({
        id: uuidv4(),
        image: req.file.path,
      });

      return res.status(201).json({
        message: "Home header slide created successfully",
        brand: newBrand,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};


