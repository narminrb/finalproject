import { Router } from "express";
import { createHomeHeaderSliderController, getHomeHeaderSliderController } from "../../../controllers/homeController/HomeSliderController.js";

const router = Router();

router.get("/", getHomeHeaderSliderController);
router.post("/create", createHomeHeaderSliderController);

export default router;