

import Cart from "../../schema/shopSchema/CartSchema.js";

// POST /api/cart/add
export const addToCart = async (req, res) => {
  const userId = req.userId;
  const { productId, qty } = req.body;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    const existing = cart.items.find(i => i.product.toString() === productId);
    if (existing) existing.qty += qty;
    else cart.items.push({ product: productId, qty });
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req, res) => {
    try {
      const userId = req.userId;
      const cart = await Cart.findOne({ user: userId }).populate("items.product");
      if (!cart) return res.json({ items: [] });
      return res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const removeFromCart = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.params;
  
    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      // Remove the whole item (regardless of quantity)
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      await cart.save();
  
      res.json({ message: 'Item removed successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // PUT /api/cart/update
export const updateCartItemQty = async (req, res) => {
  const userId = req.userId;
  const { productId, qty } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;
    await cart.save();
    res.json({ message: "Quantity updated", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
