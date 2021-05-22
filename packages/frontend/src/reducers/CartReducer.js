import { CART_ACTIONS } from '../actions/CartActions';
import remove from 'lodash.remove';

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_PRODUCT:
      return [...state, action.payload];
    case CART_ACTIONS.REMOVE_PRODUCT:
      const deletedNewArray = remove(state, (product) => {
        return product.id != action.payload;
      });
      return deletedNewArray;
    default:
      return state;
  }
};

export default cartReducer;
