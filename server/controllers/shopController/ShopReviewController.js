import ShopReviewSchema from "../../schema/shopSchema/ShopReviewSchema.js";
import ShopSchema from "../../schema/shopSchema/ShopSchema.js";

const updateProductRating = async (productId) => {
  const reviews = await ShopReviewSchema.find({ product: productId });
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  await ShopSchema.findByIdAndUpdate(productId, {
    rating: avgRating.toFixed(1),
    numReviews: reviews.length,
  });
};

// POST /api/reviews
export const addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const user = req.user._id;

    const existing = await ShopReviewSchema.findOne({ product, user });
    if (existing) {
      return res.status(400).json({ message: "You already reviewed this product." });
    }

    const review = await ShopReviewSchema.create({ product, user, rating, comment });
    await updateProductRating(product);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

// GET /api/reviews/:productId
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ShopReviewSchema.find({ product: productId }).populate("user", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// DELETE /api/reviews/:reviewId
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await ShopReviewSchema.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await ShopReviewSchema.findByIdAndDelete(reviewId);
    await updateProductRating(review.product);

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};
