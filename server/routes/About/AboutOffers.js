import { Router } from "express";
import { createAboutOffers, deleteAboutOffers, getAboutOffers, updateAboutOffers } from "../../controllers/aboutController/AboutOffersController.js";


const router = Router();

router.get("/", getAboutOffers);
router.post("/create", createAboutOffers);
router.put("/update/:id", updateAboutOffers);
router.delete("/delete/:id", deleteAboutOffers);

export default router;