import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  ImageContainer,
  DetailsContainer,
  Title,
  Price,
  Description,
  ButtonContainer,
  BuyNowButton,
  ProductImage,
  Rating,
  AddToCartButton
} from "../styles/ProductDetails.styles";
import { Currency } from "../assets/Currency";
import { RootState } from "../store";
import { addToCart, fetchCartItems } from "../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { CartItem, Product } from "../interfaces";
import { Popup, Star } from "../styles/ProductList.styles";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/slices/productSlice";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const products: Product[] = useAppSelector((state: RootState): Product[] => state.product.items);
  const isLoading: boolean = useAppSelector((state: RootState): boolean => state.product.loading);
  const error: string = useAppSelector((state: RootState): string => state.product.error);
  const cartItems: CartItem[] = useAppSelector((state: RootState): CartItem[] => state.cart.items);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const product = products.find((p): boolean => p.id === Number(productId));

  const handleAddToCart = (product: Product): void => {
    const item = {
      ...product,
      quantity: 1
    };
    dispatch(addToCart(item));
    setShowPopup(true);
    setTimeout((): void => setShowPopup(false), 2000);
  };

  useEffect((): void => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
    dispatch(fetchCartItems());
  }, []);

  const isProductInCart = (productId: number): boolean | 0 => cartItems.length && cartItems.some((item): boolean => item.id === productId);

  const handleCartButtonClick = (product: Product): void => (isProductInCart(product.id) ? navigate("/cart") : handleAddToCart(product));

  return (
    <Container>
      {showPopup && <Popup>Item added to cart</Popup>}
      {isLoading ? (
        <h1>Loading products...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : !product ? (
        <h1>Product Not found</h1>
      ) : (
        <>
          <ImageContainer>
            <ProductImage src={product.image} alt={product.title} />
          </ImageContainer>
          <DetailsContainer>
            <Title>{product.title}</Title>
            <Price>
              {Currency.Rupees} {product.price.toFixed(2)}
            </Price>
            <Rating>
              {[...Array(5)].map(
                (_, index): JSX.Element => (
                  <Star key={index} filled={index < Math.round(product.rating.rate)} />
                )
              )}
              <span>({product.rating.count})</span>
            </Rating>
            <Description>{product.description}</Description>
            <ButtonContainer>
              <AddToCartButton onClick={(): void => handleCartButtonClick(product)}>
                {isProductInCart(product.id) ? "Go to Cart" : "Add to Cart"}
              </AddToCartButton>
              <BuyNowButton>Buy Now</BuyNowButton>
            </ButtonContainer>
          </DetailsContainer>
        </>
      )}
    </Container>
  );
};

export default ProductDetails;
