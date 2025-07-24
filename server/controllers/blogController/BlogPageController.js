import { v4 as uuidv4 } from "uuid";
import { upload } from "../../helper/FileStore.js";
import BlogPageSchema from "../../schema/blogSchema/BlogPageSchema.js";



export const getBlogPage = async (req, res) => {
  try {
    const blogItems = await BlogPageSchema.find();

    if (blogItems.length === 0) {
      return res.status(404).json({ message: "No blog items found" });
    }

    return res.status(200).json({
      message: "Blog items fetched successfully",
      data: blogItems,
    });
  } catch (error) {
    console.error("GET BLOG ITEMS ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createBlogPage = (req, res) => {
    upload.fields([
      { name: "imagefirst", maxCount: 1 },
      { name: "imagesecond", maxCount: 1 },
      { name: "imagethird", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to upload image(s)", error: err.message });
      }
  
      const {
        name,
        descfirst,
        descsecond,
        descthird,
        views,
        date,
      } = req.body;
  
      const imagefirst = req.files?.imagefirst?.[0]?.path;
      const imagesecond = req.files?.imagesecond?.[0]?.path;
      const imagethird = req.files?.imagethird?.[0]?.path;
  
      if (!name || !descfirst || !descsecond || !descthird || !views || !imagefirst) {
        return res.status(400).json({ message: "Missing required fields. 'imagefirst' is required." });
      }
  
      try {
        const newBlog = await BlogPageSchema.create({
          id: uuidv4(),
          name,
          descfirst,
          descsecond,
          descthird,
          views: Number(views),
          imagefirst,
          imagesecond,
          imagethird,
          date: date || undefined, 
        });
  
        return res.status(201).json({
          message: "Blog item created successfully",
          data: newBlog,
        });
      } catch (error) {
        console.error("CREATE BLOG ITEM ERROR:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
      }
    });
  };


  export const getBlogPageById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const blogItem = await BlogPageSchema.findOne({ id: id });
  
      if (!blogItem) {
        return res.status(404).json({ message: "Blog item not found" });
      }
  
      return res.status(200).json(blogItem);
    } catch (error) {
      console.error("GET BLOG ITEM BY ID ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await BlogPageSchema.findOneAndDelete({ id }); // using your custom uuid id
      if (!deleted) {
        return res.status(404).json({ message: "Blog item not found" });
      }
      return res.status(200).json({ message: "Blog item deleted successfully" });
    } catch (error) {
      console.error("DELETE BLOG ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // UPDATE BLOG
  export const updateBlog = (req, res) => {
    upload.fields([
      { name: "imagefirst", maxCount: 1 },
      { name: "imagesecond", maxCount: 1 },
      { name: "imagethird", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to upload image(s)", error: err.message });
      }
  
      const { id } = req.params;
      const {
        name,
        descfirst,
        descsecond,
        descthird,
        views,
        date,
      } = req.body;
  
      const imagefirst = req.files?.imagefirst?.[0]?.path;
      const imagesecond = req.files?.imagesecond?.[0]?.path;
      const imagethird = req.files?.imagethird?.[0]?.path;
  
      try {
        const updateFields = {
          name,
          descfirst,
          descsecond,
          descthird,
          views: Number(views),
        };
        if (date) updateFields.date = date;
        if (imagefirst) updateFields.imagefirst = imagefirst;
        if (imagesecond) updateFields.imagesecond = imagesecond;
        if (imagethird) updateFields.imagethird = imagethird;
  
        const updated = await BlogPageSchema.findOneAndUpdate(
          { id },
          { $set: updateFields },
          { new: true }
        );
  
        if (!updated) {
          return res.status(404).json({ message: "Blog item not found" });
        }
  
        return res.status(200).json({
          message: "Blog item updated successfully",
          data: updated,
        });
      } catch (error) {
        console.error("UPDATE BLOG ERROR:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
      }
    });
  };
  