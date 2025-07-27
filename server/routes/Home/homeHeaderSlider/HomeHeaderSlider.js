import { Router } from "express";
import { createHomeHeaderSliderController, deleteHomeHeaderSliderController, getHomeHeaderSliderController, updateHomeHeaderSliderController } from "../../../controllers/homeController/HomeSliderController.js";

const router = Router();

router.get("/", getHomeHeaderSliderController);
router.post("/create", createHomeHeaderSliderController);
router.put("/update/:id", updateHomeHeaderSliderController);
router.delete("/delete/:id", deleteHomeHeaderSliderController);
export default router;