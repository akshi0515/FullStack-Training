import { AppDispatch, RootState } from "../index";
import { FETCH_CART_SUCCESS, FETCH_CART_REQUEST, FETCH_CART_FAILURE, UPDATE_CART_ITEMS } from "../actionTypes";
import axios from "axios";
import {
  CartItem,
  FetchCartSuccessAction,
  FetchCartRequestAction,
  FetchCartFailureAction,
  Product,
  UpdateCartItem
} from "../../interfaces";

const cartApi = "https://668d06cd099db4c579f16a16.mockapi.io/Cart";

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

const updateCartItem = (payload: CartItem[]): UpdateCartItem => ({
  type: UPDATE_CART_ITEMS,
  payload: payload
});

export const fetchCartItems =
  () =>
  (dispatch: AppDispatch): void => {
    dispatch(fetchCartRequest);
    axios
      .get(cartApi)
      .then((response): void => {
        dispatch(fetchCartSuccess(response.data));
        dispatch(updateCartItem(response.data));
      })
      .catch((error): void => {
        dispatch(fetchCartFailure(error.message));
      });
  };

export const addToCart =
  (product: Product) =>
  (dispatch: AppDispatch, getState: () => RootState): void => {
    axios
      .post(cartApi, product)
      .then((response): void => {
        const updatedCartItems = [...getState().items, response.data];
        dispatch(updateCartItem(updatedCartItems));
      })
      .catch((error): void => {
        dispatch(fetchCartFailure(error.message));
      });
  };

export const removeFromCart =
  (index: number, id: number) =>
  (dispatch: AppDispatch, getState: () => RootState): void => {
    axios
      .delete(cartApi + `/${index}`)
      .then((): void => {
        const updatedCartItems = getState().items.filter((item) => item.id !== id);
        dispatch(updateCartItem(updatedCartItems));
      })
      .catch((error): void => {
        dispatch(fetchCartFailure(error.message));
      });
  };

export const updateQuantity =
  (index: number, id: number, quantity: number) =>
  (dispatch: AppDispatch, getState: () => RootState): void => {
    axios
      .put(cartApi + `/${index}`, {
        quantity: quantity
      })
      .then((): void => {
        const updatedCartItems = getState().items.map((item) => (item.id === id ? { ...item, quantity } : item));
        dispatch(updateCartItem(updatedCartItems));
      })
      .catch((error): void => {
        dispatch(fetchCartFailure(error.message));
      });
  };
