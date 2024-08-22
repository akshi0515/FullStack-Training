import React, { useEffect, useState } from "react";
import {
  AddToCartButton,
  ProductCard,
  ProductImage,
  ProductListContainer,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  Rating,
  Popup,
  DescriptionLink,
  Star
} from "../styles/ProductList.styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { CartItem, Product } from "../interfaces";
import { RootState } from "../store";
import { fetchProducts } from "../api/productApi";
import { fetchCartItems, addToCart } from "../store/slices/cartSlice";
import { Currency } from "../assets/Currency";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems: CartItem[] = useAppSelector((state: RootState): CartItem[] => state.cart.items);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect((): void => {
    const loadProducts = async (): Promise<void> => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setError("404: Error fetching products" + error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
    dispatch(fetchCartItems());
  }, []);

  const handleAddToCart = (product: Product): void => {
    const item = {
      ...product,
      quantity: 1
    };
    dispatch(addToCart(item));
    setShowPopup(true);
    setTimeout((): void => setShowPopup(false), 2000);
  };

  const isProductInCart = (productId: number) => cartItems.length && cartItems.some((item): boolean => item.id === productId);

  const handleCartButtonClick = (product: Product): void => {
    if (isProductInCart(product.id)) {
      navigate("/cart");
    } else {
      handleAddToCart(product);
    }
  };

  return (
    <ProductListContainer>
      {showPopup && <Popup>Item added to cart</Popup>}
      {isLoading ? (
        <h1>Loading products...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        products.map(
          (product): JSX.Element => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
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
                  <DescriptionLink to={`/product/${product.id}`}>Read More</DescriptionLink>
                </ProductDescription>
                <AddToCartButton onClick={(): void => handleCartButtonClick(product)}>
                  {isProductInCart(product.id) ? "Go to Cart" : "Add to Cart"}
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          )
        )
      )}
    </ProductListContainer>
  );
};

export default ProductList;
