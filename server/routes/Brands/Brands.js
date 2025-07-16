import { Router } from "express";
import { createBrands, getBrands } from "../../controllers/brandsController/BrandsController.js";


const router = Router();

router.get("/", getBrands);
router.post("/create", createBrands);

export default router;