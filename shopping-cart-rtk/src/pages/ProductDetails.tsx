import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, ImageContainer, ProductImage } from "../styles/ProductDetails.styles";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { fetchProducts } from "../store/slices/productSlice";
import { fetchCartItems } from "../store/slices/cartSlice";
import { CartItem, Product } from "../interfaces";
import ProductInfoComponent from "../components/ProductInfo";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const products = useAppSelector((state: RootState): Product[] => state.product.items);
  const isLoading = useAppSelector((state: RootState): boolean => state.product.loading);
  const error = useAppSelector((state: RootState): string => state.product.error);
  const cartItems = useAppSelector((state: RootState): CartItem[] => state.cart.items);

  const [product, setProduct] = useState<Product | undefined>(location.state?.product);

  useEffect(():void => {
    if (!cartItems.length) dispatch(fetchCartItems());
    if (!product && !products.length) dispatch(fetchProducts());
    else if (!product) setProduct(products.find((p):boolean => p.id === Number(productId)));
  }, [dispatch, productId, products, product, cartItems]);

  if (isLoading) return <h1>Loading product...</h1>;
  if (error) return <h1>{error}</h1>;
  if (!product) return <h1>Product Not found</h1>;

  return (
    <Container>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.title} />
      </ImageContainer>
      <ProductInfoComponent {...product} />
    </Container>
  );
};

export default ProductDetails;
