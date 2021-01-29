import { FETCH_PRODUCTS } from "../types";

// get all products
export const fetchActions = () => async (dispatch) => {
  const res = await fetch("/api/products");
  dispatch({
    type: FETCH_PRODUCTS,
    payload: res.data,
  })
}
