import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import ProductList from "../pages/ProductList";
import ProductCard from "../components/ProductCard";
import { CartItem, Product } from "../interfaces";
import { mockProductItem, mockProducts, mockCartItem } from "../utility/mockProductListData";

jest.mock(
  "../hooks/useTypedSelector",
  (): {
    useAppDispatch: jest.MockedFunction<typeof useAppDispatch>;
    useAppSelector: jest.MockedFunction<typeof useAppSelector>;
  } => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
  })
);

jest.mock(
  "../components/ProductCard",
  (): {
    __esModule: true;
    default: React.FC<React.ComponentProps<typeof ProductCard>>;
  } => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="product-card">Product Card</div>
  })
);

describe("ProductList Component", (): void => {
  const mockDispatch = jest.fn();
  let mockSelector: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockSelector = jest.fn();
    (useAppSelector as jest.Mock).mockImplementation(mockSelector);
  });

  const setupMockSelector = (cartItems: CartItem[], products: Product[], isLoading: boolean, error: string): void => {
    mockSelector.mockReturnValueOnce(cartItems).mockReturnValueOnce(products).mockReturnValueOnce(isLoading).mockReturnValueOnce(error);
  };

  it("renders loading state", (): void => {
    setupMockSelector([], [], true, "");
    render(<ProductList />);
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("renders error state", (): void => {
    setupMockSelector([], [], false, "Error message");
    render(<ProductList />);
    expect(screen.getByText((content): boolean => content.includes("Error message"))).toBeInTheDocument();
  });

  it("renders products", (): void => {
    setupMockSelector([], mockProducts, false, "");
    render(<ProductList />);
    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
  });

  it("fetches products and cart items on mount if not available", (): void => {
    setupMockSelector([], [], false, "");
    render(<ProductList />);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it("does not fetch products or cart items if already available", (): void => {
    setupMockSelector(mockCartItem, mockProductItem, false, "");
    render(<ProductList />);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
