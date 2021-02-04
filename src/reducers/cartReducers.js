import { HANDLE_CHANGE_CART, FETCH_CART_ITEM } from '../types'

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case HANDLE_CHANGE_CART:
      return {...state, ...action.payload};
    case FETCH_CART_ITEM:
      return {...state, cartItems: action.payload}
    default:
      return state;
  }
}