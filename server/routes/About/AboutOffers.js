import { Router } from "express";
import { createAboutOffers, getAboutOffers } from "../../controllers/aboutController/AboutOffersController.js";


const router = Router();

router.get("/", getAboutOffers);
router.post("/create", createAboutOffers);

export default router;