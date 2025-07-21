// import express from "express";
// import { addReview, deleteReview, getAllReviews, getProductReviews } from "../../controllers/shopController/ShopReviewController.js";

// const router = express.Router();

// router.post("/", addReview);
// router.get("/:productId", getProductReviews);
// router.delete("/:reviewId", deleteReview);
// router.get("/", getAllReviews);


// export default router;
// routes/reviewRoutes.js
import express from "express";
import { createReview, getReviewsByProductId } from "../../controllers/shopController/ShopReviewController.js";


const router = express.Router();

router.post("/", createReview);
router.get("/:productId", getReviewsByProductId);

export default router;

