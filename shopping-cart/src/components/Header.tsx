import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaStore, FaBars } from "react-icons/fa";
import {
  StyledHeader,
  HeaderWrapper,
  StyledLogo,
  Navigation,
  NavigationLinks,
  StyledNavLink,
  StyledCartIcon,
  MobileMenuButton
} from "../styles/Header.styles";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { CartItem } from "../interfaces";
import { RootState } from "../store";
import { fetchCartItems } from "../store/actions/cartAction";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const cartItems = useAppSelector((state: RootState): CartItem[] => state.items);
  const cartItemCount = cartItems.length && cartItems.reduce((total, item): number => total + item.quantity, 0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };
    dispatch(fetchCartItems());
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (): void => {
    if (isMobile) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const handleLinkClick = (): void => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <StyledHeader>
      <HeaderWrapper>
        <StyledLogo to="/">
          <FaStore />
          Shopiee
        </StyledLogo>
        <MobileMenuButton onClick={toggleMenu}>
          <FaBars />
        </MobileMenuButton>
        <Navigation isOpen={isMenuOpen} isMobile={isMobile}>
          <NavigationLinks>
            <StyledNavLink to="/" onClick={handleLinkClick}>
              Home
            </StyledNavLink>
            <StyledNavLink to="/about" onClick={handleLinkClick}>
              About Us
            </StyledNavLink>
            <StyledNavLink to="/shops" onClick={handleLinkClick}>
              Shops
            </StyledNavLink>
            <StyledNavLink to="/contact" onClick={handleLinkClick}>
              Contact Us
            </StyledNavLink>
            <StyledCartIcon to="/cart" onClick={handleLinkClick}>
              <FaShoppingCart />
              <span>{cartItemCount}</span>
            </StyledCartIcon>
          </NavigationLinks>
        </Navigation>
      </HeaderWrapper>
    </StyledHeader>
  );
};

export default Header;
