import api from "./axios"; 

export const getCartItems = async () => {
    const res = await api.get("/cart");
    return res.data?.items ?? []; 
  };
  export const addToCart = async ({ productId, qty }) => {
    const res = await api.post('/cart/add', { productId, qty });
    return res.data;
  };
  export const deleteCartItem = async (productId) => {
    const res = await api.delete(`/cart/${productId}`);
    return res.data;
  };

  export const updateCartQuantity = async ({ productId, qty }) => {
    const res = await api.put('/cart/update', { productId, qty });
    return res.data;
  };
  