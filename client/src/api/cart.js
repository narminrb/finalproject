import api from "./axios"; // must have withCredentials: true

export const getCartItems = async () => {
    const res = await api.get("/cart");
    return res.data?.items ?? []; // if items undefined, return empty array
  };
  
  export const deleteCartItem = async (productId) => {
    const res = await api.delete(`/cart/${productId}`);
    return res.data;
  };

  export const updateCartQuantity = async ({ productId, qty }) => {
    const res = await api.put('/cart/update', { productId, qty });
    return res.data;
  };
  