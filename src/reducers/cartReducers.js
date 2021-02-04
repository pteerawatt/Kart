import { HANDLE_CHANGE_CART, FETCH_CART_ITEM, ADD_TO_CART } from '../types'

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case HANDLE_CHANGE_CART:
      return {...state, ...action.payload};
    case FETCH_CART_ITEM:
      return {...state, cartItems: action.payload};
    case ADD_TO_CART:
      let copyCart = state.cartItems.slice();
      let addedToCart = false;
      copyCart.forEach(item => {
        if (item._id === action.payload._id) {
          addedToCart = true;
          item.count++
        }
      })
      if (!addedToCart) copyCart.push({...action.payload, count: 1});
      localStorage.setItem("cartItems", JSON.stringify(copyCart));
      return {...state, cartItems: copyCart};
    default:
      return state;
  }
}