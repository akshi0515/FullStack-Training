import {
  AddToCartButton,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  Rating,
  DescriptionLink,
  Star,
  StyledToolTip,
  ClickableProductCard
} from "../styles/ProductList.styles";

import { useNavigate } from "react-router-dom";
import { CartItem, Product, ProductCardProps } from "../interfaces";
import { Currency } from "../utility/Currency";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { RootState } from "../store";
import { addToCart } from "../store/slices/cartSlice";

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowPopup }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems: CartItem[] = useAppSelector((state: RootState): CartItem[] => state.cart.items);

  const handleAddToCart = (event: React.MouseEvent, product: Product): void => {
    event.stopPropagation();
    const item = { ...product, quantity: 1 };
    dispatch(addToCart(item));
    onShowPopup();
  };
  const isProductInCart = (productId: number): boolean => cartItems.some((item): boolean => item.id === productId);

  const handleCartButtonClick = (event: React.MouseEvent, product: Product): void => {
    event.stopPropagation();
    if (isProductInCart(product.id)) {
      navigate("/cart");
    } else {
      handleAddToCart(event, product);
    }
  };

  const handleProductClick = (product: Product): void => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const truncateTitle = (title: string): string => (title.length > 30 ? title.slice(0, 30) + "..." : title);

  return (
    <ClickableProductCard key={product.id} onClick={(): void => handleProductClick(product)}>
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
  );
};

export default ProductCard;
