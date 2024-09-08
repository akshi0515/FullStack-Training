import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem, CartState, Product } from "../../interfaces";

const cartApi = "https://668d06cd099db4c579f16a16.mockapi.io/Cart";

const initialState: CartState = {
  loading: false,
  items: [] as CartItem[],
  error: ""
};

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (): Promise<CartItem[]> => {
  const response = await axios.get(cartApi);
  return response.data as CartItem[];
});

export const addToCart = createAsyncThunk("cart/addToCart", async (product: Product, { getState }): Promise<CartItem[]> => {
  const response = await axios.post(cartApi, product);
  const newItem = response.data;
  const state = getState() as { cart: CartState };
  return [...state.cart.items, newItem] as CartItem[];
});

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ index, id }: { index: number; id: number }, { getState }): Promise<CartItem[]> => {
    await axios.delete(`${cartApi}/${index}`);
    const state = getState() as { cart: CartState };
    return state.cart.items.filter((item): boolean => item.id !== id);
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ index, id, quantity }: { index: number; id: number; quantity: number }, { getState }): Promise<CartItem[]> => {
    await axios.put(`${cartApi}/${index}`, { quantity });
    const state = getState() as { cart: CartState };
    return state.cart.items.map((item): CartItem => (item.id === id ? { ...item, quantity } : item));
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder
      .addCase(fetchCartItems.pending, (state): void => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action): void => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action): void => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addMatcher(isAnyOf(addToCart.fulfilled, removeFromCart.fulfilled, updateQuantity.fulfilled), (state, action): void => {
        state.items = action.payload;
      })
      .addMatcher(isAnyOf(addToCart.rejected, removeFromCart.rejected, updateQuantity.rejected), (state, action): void => {
        state.error = action.error.message as string;
      });
  }
});

export default cartSlice.reducer;
