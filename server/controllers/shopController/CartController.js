// import Cart from "../../schema/shopSchema/CartSchema.js";

// export const addToCart = async (req, res) => {
//   const { userId, productId, quantity } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = await Cart.create({
//         userId,
//         items: [{ product: productId, quantity }],
//       });
//     } else {
//       const existingItem = cart.items.find((item) => item.product.toString() === productId);

//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         cart.items.push({ product: productId, quantity });
//       }

//       await cart.save();
//     }

//     return res.status(200).json({ message: "Added to cart", cart });
//   } catch (err) {
//     console.error("ADD TO CART ERROR:", err);
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// export const getCart = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const cart = await Cart.findOne({ userId }).populate("items.product");

//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     return res.status(200).json(cart);
//   } catch (err) {
//     console.error("GET CART ERROR:", err);
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
