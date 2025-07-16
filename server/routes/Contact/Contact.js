import { Router } from "express";
import { createContactMessage, getContactMessages } from "../../controllers/contactController/ContactController.js";


const router = Router();

router.get("/", getContactMessages);
router.post("/create", createContactMessage);

export default router;