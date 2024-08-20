import React, { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useTypedSelector";
import { MdCancel, MdShoppingCart } from "react-icons/md";
import {
  CartContainer,
  CartTable,
  ProductImage,
  QuantityButton,
  QuantityControl,
  RemoveButton,
  CartTotals,
  EmptyCartMessage,
  CartContent,
  CheckoutButton,
  CartTableWrapper
} from "../styles/ShoppingCart.styles";
import { CartState, CartItem } from "../interfaces";
import { updateQuantity, removeFromCart, fetchCartItems } from "../store/actions/cartAction";

const ShoppingCart: React.FC = () => {
  const cartItems = useAppSelector((state: CartState): CartItem[] => state.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const handleQuantityChange = (i: number, id: number, newQuantity: number): void => {
    if (newQuantity > 0) {
      dispatch(updateQuantity(i, id, newQuantity));
    } else {
      dispatch(removeFromCart(i, id));
    }
  };

  const subtotal = useMemo((): number => {
    if (cartItems.length) return cartItems.reduce((total, item): number => total + item.price * item.quantity, 0);
    else return 0;
  }, [cartItems]);

  const discount = 0;
  const total = subtotal - discount;

  return (
    <CartContainer>
      <CartContent>
        {!cartItems.length ? (
          <EmptyCartMessage>
            <MdShoppingCart size={50} />
            <p>Your cart is empty. Start shopping to add items!</p>
          </EmptyCartMessage>
        ) : (
          <CartTableWrapper>
            <CartTable>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(
                  (item): JSX.Element => (
                    <tr key={item.id}>
                      <td>
                        <ProductImage src={item.image} alt={item.title} />
                      </td>
                      <td>{item.title}</td>
                      <td>Rs {item.price.toFixed(2)}</td>
                      <td>
                        <QuantityControl>
                          <QuantityButton onClick={(): void => handleQuantityChange(item.i, item.id, item.quantity - 1)}>-</QuantityButton>
                          <span>{item.quantity}</span>
                          <QuantityButton onClick={(): void => handleQuantityChange(item.i, item.id, item.quantity + 1)}>+</QuantityButton>
                        </QuantityControl>
                      </td>
                      <td>Rs {(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <RemoveButton onClick={(): void => dispatch(removeFromCart(item.i, item.id))}>
                          <MdCancel />
                        </RemoveButton>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </CartTable>
          </CartTableWrapper>
        )}
        <CartTotals>
          <h3>Cart Totals</h3>
          <div>
            <span>Subtotal:</span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>
          <div>
            <span>Discount:</span>
            <span>Rs {discount.toFixed(2)}</span>
          </div>
          <div className="total">
            <span>Total:</span>
            <span>Rs {total.toFixed(2)}</span>
          </div>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </CartTotals>
      </CartContent>
    </CartContainer>
  );
};

export default ShoppingCart;
