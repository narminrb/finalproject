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
