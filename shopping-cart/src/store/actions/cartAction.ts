import { AppDispatch } from "../index";
import { FETCH_CART_SUCCESS, FETCH_CART_REQUEST, FETCH_CART_FAILURE } from "../actionTypes";
import axios from "axios";
import { CartItem, FetchCartSuccessAction, FetchCartRequestAction, FetchCartFailureAction, Product } from "../../interfaces";

export const fetchCartSuccess = (items: CartItem[]): FetchCartSuccessAction => ({
  type: FETCH_CART_SUCCESS,
  payload: items
});

export const fetchCartRequest = (): FetchCartRequestAction => ({
  type: FETCH_CART_REQUEST
});

const fetchCartFailure = (errorMessage: string): FetchCartFailureAction => ({
  type: FETCH_CART_FAILURE,
  payload: errorMessage
});

export const fetchCartItems =
  () =>
  (dispatch: AppDispatch): void => {
    dispatch(fetchCartRequest);
    axios
      .get("https://668d06cd099db4c579f16a16.mockapi.io/Cart")
      .then((response): void => {
        const items = response.data;
        dispatch(fetchCartSuccess(items));
      })
      .catch((error): void => {
        const errorMessage = error.message;
        dispatch(fetchCartFailure(errorMessage));
      });
  };

export const addToCart =
  (product: Product) =>
  (dispatch: AppDispatch): void => {
    dispatch(fetchCartRequest);
    axios
      .post("https://668d06cd099db4c579f16a16.mockapi.io/Cart", product)
      .then((response): void => {
        const items = response.data;
        dispatch(fetchCartSuccess(items));
      })
      .catch((error): void => {
        const errorMessage = error.message;
        dispatch(fetchCartFailure(errorMessage));
      });
  };

export const removeFromCart =
  (id: number) =>
  (dispatch: AppDispatch): void => {
    dispatch(fetchCartRequest);
    axios
      .delete(`https://668d06cd099db4c579f16a16.mockapi.io/Cart/${id}`)
      .then((response): void => {
        const items = response.data;
        dispatch(fetchCartSuccess(items));
      })
      .catch((error): void => {
        const errorMessage = error.message;
        dispatch(fetchCartFailure(errorMessage));
      });
  };

export const updateQuantity =
  (id: number, quantity: number) =>
  (dispatch: AppDispatch): void => {
    dispatch(fetchCartRequest);
    axios
      .put(`https://668d06cd099db4c579f16a16.mockapi.io/Cart/${id}`, {
        quantity: quantity
      })
      .then((response): void => {
        const items = response.data;
        dispatch(fetchCartSuccess(items));
      })
      .catch((error): void => {
        const errorMessage = error.message;
        dispatch(fetchCartFailure(errorMessage));
      });
  };
