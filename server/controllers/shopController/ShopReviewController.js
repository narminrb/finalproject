// controllers/reviewController.js
import Review from "../../schema/shopSchema/ShopReviewSchema.js";
import Shop from "../../schema/shopSchema/ShopSchema.js";

export const createReview = async (req, res) => {
  try {
    const { product, rating, comment, reviewerName, reviewerEmail } = req.body;

    if (!product || !rating || !comment || !reviewerName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const foundProduct = await Shop.findById(product);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = await Review.create({
      product,
      rating,
      comment,
      reviewerName,
      reviewerEmail,
    });

    // Update product rating and review count
    const reviews = await Review.find({ product });
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    foundProduct.rating = avgRating;
    foundProduct.numReviews = reviews.length;
    await foundProduct.save();

    res.status(201).json(review);
  } catch (error) {
    console.error("Create Review Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
