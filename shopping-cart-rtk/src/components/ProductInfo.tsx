import React from "react";
import { Title, Price, Description, Rating, DetailsContainer } from "../styles/ProductDetails.styles";
import { Product } from "../interfaces";
import { Currency } from "../utility/Currency";
import { Star } from "../styles/ProductList.styles";
import CartButtonComponent from "../components/CartButton";

const ProductInfoComponent: React.FC<Product> = ({ ...product }) => {
  return (
    <DetailsContainer>
      <Title>{product.title}</Title>
      <Price>
        {Currency.Rupees} {product.price.toFixed(2)}
      </Price>
      <Rating>
        {[...Array(5)].map((_, index):JSX.Element => (
          <Star key={index} filled={index < Math.round(product.rating.rate)} />
        ))}
        <span>({product.rating.count})</span>
      </Rating>
      <Description>{product.description}</Description>
      <CartButtonComponent product={product} />
    </DetailsContainer>
  );
};

export default ProductInfoComponent;
