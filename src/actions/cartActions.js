import { HANDLE_CHANGE_CART, FETCH_CART_ITEM } from '../types'

export const handleChangeCart = (e) => (dispatch) => {
  dispatch({
    type: HANDLE_CHANGE_CART,
    payload: {[e.target.name]: e.target.value}
  })
}

export const fetchCartItem = () => async (dispatch) => {
  const cartItem = await localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
  dispatch({
    type: FETCH_CART_ITEM,
    payload: cartItem
  })
}
