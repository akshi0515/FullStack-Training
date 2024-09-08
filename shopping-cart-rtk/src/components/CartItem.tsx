import React, { useCallback } from "react";
import { MdCancel } from "react-icons/md";
import { CartItemProps } from "../interfaces";
import { Currency } from "../utility/Currency";
import { ProductImage, QuantityButton, QuantityControl, RemoveButton } from "../styles/ShoppingCart.styles";

const CartItemComponent: React.FC<CartItemProps> = ({ item, handleQuantityChange, removeItem }) => {
  const handleIncrement = useCallback((): void => {
    handleQuantityChange(item.index, item.id, item.quantity + 1);
  }, [handleQuantityChange, item.index, item.id, item.quantity]);

  const handleDecrement = useCallback((): void => {
    handleQuantityChange(item.index, item.id, item.quantity - 1);
  }, [handleQuantityChange, item.index, item.id, item.quantity]);

  const handleRemove = useCallback((): void => {
    removeItem(item.index, item.id);
  }, [removeItem, item.index, item.id]);

  return (
    <tr>
      <td>
        <ProductImage src={item.image} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>
        {Currency.Rupees} {item.price.toFixed(2)}
      </td>
      <td>
        <QuantityControl>
          <QuantityButton onClick={handleDecrement}>-</QuantityButton>
          <span>{item.quantity}</span>
          <QuantityButton onClick={handleIncrement}>+</QuantityButton>
        </QuantityControl>
      </td>
      <td>
        {Currency.Rupees} {(item.price * item.quantity).toFixed(2)}
      </td>
      <td>
        <RemoveButton onClick={handleRemove}>
          <MdCancel />
        </RemoveButton>
      </td>
    </tr>
  );
};

export default CartItemComponent;
