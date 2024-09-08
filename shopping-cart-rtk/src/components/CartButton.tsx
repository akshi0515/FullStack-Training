import React, { useEffect, useState } from "react";
import { CartItem, Product, CartButtonProps } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { addToCart } from "../store/slices/cartSlice";
import { RootState } from "../store";
import { ButtonContainer, AddToCartButton, BuyNowButton, Popup, DetailsContainer } from "../styles/ProductDetails.styles";

const CartButtonComponent: React.FC<CartButtonProps> = ({ product }):JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState): CartItem[] => state.cart.items);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(():()=> void => {
    let timeout: NodeJS.Timeout;
    if (showPopup) {
      timeout = setTimeout(():void => setShowPopup(false), 2000);
    }
    return ():void => clearTimeout(timeout);
  }, [showPopup]);

  const isProductInCart = (productId: number): boolean => cartItems.some((item): boolean => item.id === productId);

  const handleAddToCart = (product: Product): void => {
    const item = {
      ...product,
      quantity: 1
    };
    dispatch(addToCart(item));
    setShowPopup(true);
  };

  const handleCartButtonClick = (product: Product): void => {
    if (isProductInCart(product.id)) {
      navigate("/cart");
    } else {
      handleAddToCart(product);
    }
  };

  return (
    <DetailsContainer>
      {showPopup && <Popup>Item added to cart</Popup>}
      <ButtonContainer>
        <AddToCartButton onClick={(): void => handleCartButtonClick(product)}>
          {isProductInCart(product.id) ? "Go to Cart" : "Add to Cart"}
        </AddToCartButton>
        <BuyNowButton>Buy Now</BuyNowButton>
      </ButtonContainer>
    </DetailsContainer>
  );
};

export default CartButtonComponent;
