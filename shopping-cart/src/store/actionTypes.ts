import { FetchCartFailureAction, FetchCartRequestAction, FetchCartSuccessAction } from "../interfaces";
import cartReducer from "./reducers/cartReducer";

export const FETCH_CART_REQUEST = "FETCH_CART_REQUEST";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAILURE = "FETCH_cART_FAILURE";

export type CartActionTypes = FetchCartSuccessAction | FetchCartRequestAction | FetchCartFailureAction;

export type RootState = ReturnType<typeof cartReducer>;
