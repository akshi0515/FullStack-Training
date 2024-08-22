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
