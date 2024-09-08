import React from "react";
import { CartTable, CartTableWrapper } from "../styles/ShoppingCart.styles";
import { CartTableProps } from "../interfaces";
import CartItemComponent from "./CartItem";

const CartTableComponent: React.FC<CartTableProps> = ({ cartItems, handleQuantityChange, removeItem }) => {
  const tableHeaders = ["Image", "Product", "Price", "Quantity", "Total", "Remove"];

  return (
    <CartTableWrapper>
      <CartTable>
        <thead>
          <tr>
            {tableHeaders.map(
              (tableHeader): JSX.Element => (
                <th key={tableHeader}>{tableHeader}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {cartItems.map(
            (item): JSX.Element => (
              <CartItemComponent key={item.id} item={item} handleQuantityChange={handleQuantityChange} removeItem={removeItem} />
            )
          )}
        </tbody>
      </CartTable>
    </CartTableWrapper>
  );
};

export default CartTableComponent;
