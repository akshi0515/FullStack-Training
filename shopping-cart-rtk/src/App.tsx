import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContainer } from "./styles/App.styles";
import store from "./store";
import Header from "./components/Header";
import Page404 from "./components/Page404";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetails from "./components/ProductDetials";

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </AppContainer>
    </Provider>
  </BrowserRouter>
);

export default App;
