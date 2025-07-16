import { Router } from "express";
import { createBlogPage, getBlogPage } from "../../controllers/blogController/BlogPageController.js";


const router = Router();

router.get("/", getBlogPage);
router.post("/create", createBlogPage);

export default router;