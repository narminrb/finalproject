import { Router } from "express";
import { createAboutPage, getAboutPage } from "../../controllers/aboutController/AboutPageController.js";


const router = Router();

router.get("/", getAboutPage);
router.post("/create", createAboutPage);

export default router;