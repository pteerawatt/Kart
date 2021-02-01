import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCT_BY_PRICE } from "../types";

// get all products
export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  })
}
 
export const filterProducts = (products, size) => (dispatch) => {
  const filteredProducts = size === "" ? products:
  products.filter(product => product.availableSizes.indexOf(size) > - 1)
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items: filteredProducts
    }
  })
}

export const sortProducts = (products, sort) => (dispatch) => {
  const sortedProducts = products.slice();
  sort === "lowest" ? sortedProducts.sort((a, b) => b.price < a.price ? 1: -1):
      sort === "highest" ? sortedProducts.sort((a, b) => b.price > a.price ? 1: -1):
      sortedProducts.sort((a, b) => a._id > b._id ? -1 : 1)
  dispatch({
    type: ORDER_PRODUCT_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts
    }
  })
}