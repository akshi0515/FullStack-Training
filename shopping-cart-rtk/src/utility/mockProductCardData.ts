export const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 19.99,
  description: "This is a test product description",
  image: "test-image.jpg",
  rating: { rate: 4.5, count: 100 }
};

export const longProductTitle = "This is a very long product title that should be truncated";
export const truncatedTtile = "This is a very long product ti...";

export const mockCartProduct = {
  ...mockProduct,
  quantity: 1
};

export const mockCart = {
    items: [{...mockCartProduct, index:0}],
    loading: false,
    error: ""
  };