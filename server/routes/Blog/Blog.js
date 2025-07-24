import { Router } from "express";
import { createBlog, getBlog } from "../../controllers/blogController/BlogController.js";


const router = Router();

router.get("/", getBlog);
router.post("/create", createBlog);


export default router;