import { Router } from "express";
import { createAboutPage, deleteAboutPage, getAboutPage, updateAboutPage } from "../../controllers/aboutController/AboutPageController.js";


const router = Router();

router.get("/", getAboutPage);
router.post("/create", createAboutPage);
router.put("/update/:id", updateAboutPage);
router.delete("/delete/:id", deleteAboutPage);

export default router;