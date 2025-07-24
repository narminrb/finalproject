import { Router } from "express";
import { createBlogPage, deleteBlog, getBlogPage, getBlogPageById, updateBlog } from "../../controllers/blogController/BlogPageController.js";


const router = Router();

router.get("/", getBlogPage);
router.get("/:id", getBlogPageById); 
router.post("/create", createBlogPage);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

export default router;