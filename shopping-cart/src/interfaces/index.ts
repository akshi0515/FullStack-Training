import { FETCH_CART_REQUEST, FETCH_CART_SUCCESS, FETCH_CART_FAILURE, UPDATE_CART_ITEMS } from "../store/actionTypes";

interface Rating {
  rate: number;
  count: number;
}

export interface CartState {
  loading: boolean;
  items: CartItem[];
  error: string;
}

export interface Product {
  description: string;
  rating: Rating;
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  index: number;
}

export interface FetchCartRequestAction {
  type: typeof FETCH_CART_REQUEST;
}

export interface FetchCartSuccessAction {
  type: typeof FETCH_CART_SUCCESS;
  payload: CartItem[];
}

export interface FetchCartFailureAction {
  type: typeof FETCH_CART_FAILURE;
  payload: string;
}

export interface UpdateCartItem {
  type: typeof UPDATE_CART_ITEMS;
  payload: CartItem[];
}
