import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, NavigateFunction, useNavigate } from "react-router-dom";
import cartReducer from "../store/slices/cartSlice";
import axios from "axios";
import { CartState } from "../interfaces";
import ProductCard from "../components/ProductCard";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import { longProductTitle, mockCart, mockCartProduct, mockProduct, truncatedTtile } from "../utility/mockProductCardData";
import { Currency } from "../utility/Currency";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", (): typeof import("react-router-dom") => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: (): NavigateFunction => mockNavigate as ReturnType<typeof useNavigate>
}));

const createMockStore = (initialState: Partial<CartState> = { items: [], loading: false, error: "" }) => {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: { cart: initialState as CartState }
  });
};

describe("ProductCard Component", (): void => {
  const mockOnShowPopup = jest.fn();

  beforeEach((): void => {
    jest.clearAllMocks();
  });

  const renderProductCard = (store: ReturnType<typeof createMockStore>): void => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <ProductCard product={mockProduct} onShowPopup={mockOnShowPopup} />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it("renders product information correctly", (): void => {
    const store = createMockStore();
    renderProductCard(store);

    expect(screen.getByAltText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(Currency.Rupees + " " + mockProduct.price)).toBeInTheDocument();
    expect(screen.getByText(RegExp(`${mockProduct.description}`))).toBeInTheDocument();
  });

  it("truncates long product titles", (): void => {
    const store = createMockStore();
    const longTitleProduct = { ...mockProduct, title: longProductTitle };
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <ProductCard product={longTitleProduct} onShowPopup={mockOnShowPopup} />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(RegExp(`${truncatedTtile}`))).toBeInTheDocument();
  });

  it("adds product to cart when 'Add to Cart' button is clicked", async (): Promise<void> => {
    const store = createMockStore();
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue({ data: mockCartProduct });

    renderProductCard(store);

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    await waitFor((): void => {
      const state = store.getState();
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0]).toEqual(mockCartProduct);
      expect(mockOnShowPopup).toHaveBeenCalled();
    });
  });

  it("displays 'Go to Cart' when product is already in cart", (): void => {
    const store = createMockStore(mockCart);
    renderProductCard(store);

    expect(screen.getByText("Go to Cart")).toBeInTheDocument();
  });

  it("shows popup when Add to Cart is clicked and changes text to Go to Cart", async (): Promise<void> => {
    const store = createMockStore();
    renderProductCard(store);

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(mockOnShowPopup).toHaveBeenCalled();
      expect(screen.getByText("Go to Cart")).toBeInTheDocument();
    });
  });

  it("navigates to cart page when Go to Cart is clicked", (): void => {
    const store = createMockStore(mockCart);
    renderProductCard(store);

    const goToCartButton = screen.getByText("Go to Cart");
    fireEvent.click(goToCartButton);

    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });

  it("navigates to product details page when product is clicked", (): void => {
    const store = createMockStore();
    renderProductCard(store);

    const productTitle = screen.getByText(mockProduct.title);
    fireEvent.click(productTitle);

    expect(mockNavigate).toHaveBeenCalledWith(`/product/${mockProduct.id}`, { state: { product: mockProduct } });
  });
});
