import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";

const initialState = {};

// composeEnhancer allows us to send redux store to chrome so we can monitor the store in devtools.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({ 
  products: productsReducer,
})
  , initialState
  , composeEnhancer(applyMiddleware(thunk))
)

export default store;
