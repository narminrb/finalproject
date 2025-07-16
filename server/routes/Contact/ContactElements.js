import { Router } from "express";
import { createContactElement, getContactElement } from "../../controllers/contactController/ContactElementsController.js";


const router = Router();

router.get("/", getContactElement);
router.post("/create", createContactElement);

export default router;