import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, ProductState } from "../../interfaces";

const productApi = "https://fakestoreapi.com/products";

const initialState: ProductState = {
  loading: false,
  items: [] as Product[],
  error: ""
};

export const fetchProducts = createAsyncThunk("cart/fetchProducts", async (): Promise<Product[]> => {
  const response = await axios.get(productApi);
  return response.data as Product[];
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder
      .addCase(fetchProducts.pending, (state): void => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action): void => {
        state.loading = false;
        state.items = action.payload as Product[];
      })
      .addCase(fetchProducts.rejected, (state, action): void => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  }
});

export default productSlice.reducer;
