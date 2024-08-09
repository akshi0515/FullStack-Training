import axios from "axios";
import { Product } from "../interfaces";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data.map(
    (item: Product): Product => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      rating: item.rating,
      description: item.description
    })
  );
};
