import React, { useEffect, useState } from "react";
import {
  AddToCartButton,
  ProductImage,
  ProductListContainer,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  Rating,
  Popup,
  DescriptionLink,
  Star,
  StyledToolTip,
  ClickableProductCard
} from "../styles/ProductList.styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { CartItem, Product } from "../interfaces";
import { RootState } from "../store";
import { fetchCartItems, addToCart } from "../store/slices/cartSlice";
import { Currency } from "../assets/Currency";
import { fetchProducts } from "../store/slices/productSlice";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems: CartItem[] = useAppSelector((state: RootState): CartItem[] => state.cart.items);
  const products: Product[] = useAppSelector((state: RootState): Product[] => state.product.items);
  const isLoading: boolean = useAppSelector((state: RootState): boolean => state.product.loading);
  const error: string = useAppSelector((state: RootState): string => state.product.error);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect((): void => {
    if (!products.length) dispatch(fetchProducts());
    if (!cartItems.length) dispatch(fetchCartItems());
  }, []);

  const handleAddToCart = (event: React.MouseEvent, product: Product): void => {
    event.stopPropagation();
    const item = {
      ...product,
      quantity: 1
    };
    dispatch(addToCart(item));
    setShowPopup(true);
    setTimeout((): void => setShowPopup(false), 2000);
  };

  const isProductInCart = (productId: number): boolean | 0 => cartItems.length && cartItems.some((item): boolean => item.id === productId);

  const handleCartButtonClick = (event: React.MouseEvent, product: Product): void => {
    event.stopPropagation();
    if (isProductInCart(product.id)) {
      navigate("/cart");
    } else {
      handleAddToCart(event, product);
    }
  };

  const handleProductClick = (productId: number): void => {
    navigate(`/product/${productId}`);
  };

  const truncateTitle = (title: string): string => (title.length > 30 ? title.slice(0, 30) + "..." : title);

  return (
    <ProductListContainer>
      {showPopup && <Popup>Item added to cart</Popup>}
      {isLoading ? (
        <h1>Loading products...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        products.map(
          (product): JSX.Element => (
            <ClickableProductCard key={product.id} onClick={(): void => handleProductClick(product.id)}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductInfo>
                <ProductTitle data-tooltip-id={`tooltip-${product.id}`} data-tooltip-content={product.title}>
                  {truncateTitle(product.title)}
                </ProductTitle>
                <StyledToolTip id={`tooltip-${product.id}`} />
                <Rating>
                  {[...Array(5)].map(
                    (_, index): JSX.Element => (
                      <Star key={index} filled={index < Math.round(product.rating.rate)} />
                    )
                  )}
                  <span>({product.rating.count})</span>
                </Rating>
                <ProductPrice>
                  {Currency.Rupees} {product.price.toFixed(2)}
                </ProductPrice>
                <ProductDescription>
                  {product.description.slice(0, 80)}...
                  <DescriptionLink to={`/product/${product.id}`} onClick={(event): void => event.stopPropagation()}>
                    Read More
                  </DescriptionLink>
                </ProductDescription>
                <AddToCartButton onClick={(event): void => handleCartButtonClick(event, product)}>
                  {isProductInCart(product.id) ? "Go to Cart" : "Add to Cart"}
                </AddToCartButton>
              </ProductInfo>
            </ClickableProductCard>
          )
        )
      )}
    </ProductListContainer>
  );
};

export default ProductList;
