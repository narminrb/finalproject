import { Router } from "express";
import { createContactElement, deleteContactElement, getContactElement, updateContactElement } from "../../controllers/contactController/ContactElementsController.js";


const router = Router();

router.get("/", getContactElement);
router.post("/create", createContactElement);
router.put("/update/:id", updateContactElement);
router.delete("/delete/:id", deleteContactElement);

export default router;