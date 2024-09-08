import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppContainer } from "./styles/App.styles";
import Header from "./components/Header";
import Page404 from "./pages/Page404";
import ProductList from "./pages/ProductList";
import ShoppingCart from "./pages/ShoppingCart";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/Login";
import RegisterForm from "./pages/Signup";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const App: React.FC = () => (
  <AppContainer>
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </ThemeProvider>
  </AppContainer>
);

export default App;
