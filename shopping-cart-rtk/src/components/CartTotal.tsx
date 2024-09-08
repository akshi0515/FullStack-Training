import React from "react";
import { CartTotals, CheckoutButton } from "../styles/ShoppingCart.styles";
import { Currency } from "../utility/Currency";
import { CartTotalsProps } from "../interfaces";

const CartTotalsComponent: React.FC<CartTotalsProps> = ({ subtotal, discount, total }) => {
  return (
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
  );
};

export default CartTotalsComponent;
