import { Router } from "express";
import { createBlogPage, getBlogPage, getBlogPageById } from "../../controllers/blogController/BlogPageController.js";


const router = Router();

router.get("/", getBlogPage);
router.get("/:id", getBlogPageById); 
router.post("/create", createBlogPage);

export default router;