import React, { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useTypedSelector";
import { MdShoppingCart } from "react-icons/md";
import { CartContainer, EmptyCartMessage, CartContent } from "../styles/ShoppingCart.styles";
import { fetchCartItems, updateQuantity, removeFromCart } from "../store/slices/cartSlice";
import { RootState } from "../store";
import { CartItem } from "../interfaces";
import CartTableComponent from "../components/CartTable";
import CartTotalsComponent from "../components/CartTotal";

const ShoppingCart: React.FC = () => {
  const cartItems: CartItem[] = useAppSelector((state: RootState): CartItem[] => state.cart.items);
  const isLoading: boolean = useAppSelector((state: RootState): boolean => state.cart.loading);
  const error: string = useAppSelector((state: RootState): string => state.cart.error);
  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (!cartItems.length) dispatch(fetchCartItems());
  }, []);

  const handleQuantityChange = (index: number, id: number, newQuantity: number): void => {
    dispatch(newQuantity > 0 ? updateQuantity({ index: index, id: id, quantity: newQuantity }) : removeFromCart({ index: index, id: id }));
  };

  const subtotal = useMemo(
    (): number => (cartItems.length ? cartItems.reduce((total, item): number => total + item.price * item.quantity, 0) : 0),
    [cartItems]
  );

  const discount = 0;
  const total = subtotal - discount;

  return (
    <CartContainer>
      {isLoading ? (
        <h1>Loading products...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <CartContent>
          {!cartItems.length ? (
            <EmptyCartMessage>
              <MdShoppingCart size={50} />
              <p>Your cart is empty. Start shopping to add items!</p>
            </EmptyCartMessage>
          ) : (
            <>
              <CartTableComponent
                cartItems={cartItems}
                handleQuantityChange={handleQuantityChange}
                removeItem={(index, id) => dispatch(removeFromCart({ index, id }))}
              />
              <CartTotalsComponent subtotal={subtotal} discount={discount} total={total} />
            </>
          )}
        </CartContent>
      )}
    </CartContainer>
  );
};

export default ShoppingCart;
