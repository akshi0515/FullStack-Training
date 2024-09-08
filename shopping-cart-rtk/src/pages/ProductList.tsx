import React, { useEffect, useState } from "react";
import { ProductListContainer, Popup } from "../styles/ProductList.styles";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { CartItem, Product } from "../interfaces";
import { RootState } from "../store";
import { fetchCartItems } from "../store/slices/cartSlice";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems: CartItem[] = useAppSelector((state: RootState): CartItem[] => state.cart.items);
  const products: Product[] = useAppSelector((state: RootState): Product[] => state.product.items);
  const isLoading: boolean = useAppSelector((state: RootState): boolean => state.product.loading);
  const error: string = useAppSelector((state: RootState): string => state.product.error);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(():void => {
    if (!error) {
      if (!products.length) dispatch(fetchProducts());
      if (!cartItems.length) dispatch(fetchCartItems());
    }
  }, [dispatch, error, products.length, cartItems.length]);

  const handleShowPopup = (): void => {
    setShowPopup(true);
    setTimeout((): void => setShowPopup(false), 2000);
  };

  return (
    <ProductListContainer>
      {showPopup && <Popup>Item added to cart</Popup>}
      {isLoading ? (
        <h1>Loading products...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        products.map((product: Product): JSX.Element => <ProductCard key={product.id} product={product} onShowPopup={handleShowPopup} />)
      )}
    </ProductListContainer>
  );
};

export default ProductList;
