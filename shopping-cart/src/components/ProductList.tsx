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
  Popup
} from "../styles/ProductList.styles";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { fetchProducts } from "../apis/productApi";
import { CartItem, Product } from "../interfaces";
import { RootState } from "../store";
import { fetchCartItems, addToCart } from "../store/actions/cartAction";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems: CartItem[] = useAppSelector((state: RootState): CartItem[] => state.items);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect((): void => {
    const loadProducts = async (): Promise<void> => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("404: Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
    dispatch(fetchCartItems());
  }, [dispatch, cartItems]);

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
                    (_, i): JSX.Element => (
                      <FaStar key={i} color={i < Math.round(product.rating.rate) ? "#ffc107" : "#e4e5e9"} />
                    )
                  )}
                  <span>({product.rating.count})</span>
                </Rating>
                <ProductPrice>Rs {product.price.toFixed(2)}</ProductPrice>
                <ProductDescription>{product.description.slice(0, 100)}...</ProductDescription>
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
