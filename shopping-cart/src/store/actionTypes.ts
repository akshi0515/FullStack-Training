import { FetchCartFailureAction, FetchCartRequestAction, FetchCartSuccessAction, UpdateCartItem } from "../interfaces";
import cartReducer from "./reducers/cartReducer";

export const FETCH_CART_REQUEST = "FETCH_CART_REQUEST";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAILURE = "FETCH_CART_FAILURE";
export const UPDATE_CART_ITEMS = "UPDATE_CART_ITEMS";

export type CartActionTypes = FetchCartSuccessAction | FetchCartRequestAction | FetchCartFailureAction | UpdateCartItem;

export type RootState = ReturnType<typeof cartReducer>;
