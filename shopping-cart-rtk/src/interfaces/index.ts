interface Rating {
  rate: number;
  count: number;
}

export interface CartState {
  loading: boolean;
  items: CartItem[];
  error: string;
}

export interface Product {
  description: string;
  rating: Rating;
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface ProductState {
  loading: boolean;
  items: Product[];
  error: string;
}

export interface CartItem extends Product {
  quantity: number;
  index: number;
}

export interface User {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  error: string | null;
}

export interface ProductCardProps {
  product: Product;
  onShowPopup: () => void;
}

export interface CartButtonProps {
  product: Product;
}

export interface CartItemProps {
  item: CartItem;
  handleQuantityChange: (index: number, id: number, newQuantity: number) => void;
  removeItem: (index: number, id: number) => void;
}

export interface CartTableProps {
  cartItems: CartItem[];
  handleQuantityChange: (index: number, id: number, newQuantity: number) => void;
  removeItem: (index: number, id: number) => void;
}

export interface CartTotalsProps {
  subtotal: number;
  discount: number;
  total: number;
}

export interface ProductImageProps {
  image: string;
  title: string;
}
