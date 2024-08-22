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
import { CartItem } from "../interfaces";

import { Currency } from "../assets/Currency";
import { fetchCartItems, updateQuantity, removeFromCart } from "../store/slices/cartSlice";
import { RootState } from "../store";

const ShoppingCart: React.FC = () => {
  const cartItems: CartItem[] = useAppSelector((state: RootState): CartItem[] => state.cart.items);
  const dispatch = useAppDispatch();
  const tableHeaders = ["Image", "Product", "Price", "Quantity", "Total"];

  useEffect(() => {
    dispatch(fetchCartItems());
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
                  {tableHeaders.map((tableHeader) => (
                    <th key={tableHeader}>{tableHeader}</th>
                  ))}
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
                      <td>
                        {Currency.Rupees} {item.price.toFixed(2)}
                      </td>
                      <td>
                        <QuantityControl>
                          <QuantityButton onClick={(): void => handleQuantityChange(item.index, item.id, item.quantity - 1)}>
                            -
                          </QuantityButton>
                          <span>{item.quantity}</span>
                          <QuantityButton onClick={(): void => handleQuantityChange(item.index, item.id, item.quantity + 1)}>
                            +
                          </QuantityButton>
                        </QuantityControl>
                      </td>
                      <td>
                        {Currency.Rupees} {(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <RemoveButton
                          onClick={(): void => {
                            dispatch(removeFromCart({ index: item.index, id: item.id }));
                          }}
                        >
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
            <span>
              {Currency.Rupees} {subtotal.toFixed(2)}
            </span>
          </div>
          <div>
            <span>Discount:</span>
            <span>
              {Currency.Rupees} {discount.toFixed(2)}
            </span>
          </div>
          <div className="total">
            <span>Total:</span>
            <span>
              {Currency.Rupees} {total.toFixed(2)}
            </span>
          </div>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </CartTotals>
      </CartContent>
    </CartContainer>
  );
};

export default ShoppingCart;
