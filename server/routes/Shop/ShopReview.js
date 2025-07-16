import express from "express";
import { addReview, deleteReview, getProductReviews } from "../../controllers/shopController/ShopReviewController.js";

const router = express.Router();

router.post("/", addReview);
router.get("/:productId", getProductReviews);
router.delete("/:reviewId", deleteReview);

export default router;
