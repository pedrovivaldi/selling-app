import { CART_ACTIONS } from '../actions/CartActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import remove from 'lodash.remove';

export const LOCAL_STORAGE_KEY = 'cart';

let initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_PRODUCT:
      const newState = [...state, action.payload];
      AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    case CART_ACTIONS.REMOVE_PRODUCT:
      const deletedNewArray = remove(state, (product) => {
        return product.id != action.payload;
      });
      AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deletedNewArray));
      return deletedNewArray;
    default:
      return state;
  }
};

export default cartReducer;
