import { CartItem, CartState } from "../../interfaces";
import { CartActionTypes, FETCH_CART_REQUEST, FETCH_CART_SUCCESS, FETCH_CART_FAILURE } from "../actionTypes";

const initialCartState: CartState = {
  loading: false,
  items: [] as CartItem[],
  error: ""
};

const cartReducer = (state = initialCartState, action: CartActionTypes): CartState => {
  switch (action.type) {
  case FETCH_CART_REQUEST:
    return {
      ...state,
      loading: true
    };
  case FETCH_CART_SUCCESS:
    return {
      ...state,
      loading: false,
      items: action.payload
    };
  case FETCH_CART_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    };
  default:
    return state;
  }
};

export default cartReducer;
