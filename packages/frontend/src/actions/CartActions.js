export const CART_ACTIONS = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT'
};

export const addproduct = (product) => ({
  type: CART_ACTIONS.ADD_PRODUCT,
  payload: product
});

export const removeproduct = (id) => ({
  type: CART_ACTIONS.REMOVE_PRODUCT,
  payload: id
});
