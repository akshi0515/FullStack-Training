import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStore, FaBars, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import {
  StyledHeader,
  HeaderWrapper,
  StyledLogo,
  Navigation,
  NavigationLinks,
  StyledNavLink,
  StyledCartIcon,
  MobileMenuButton,
  AuthButton,
  WelcomeMessage,
  StyledToolTip
} from "../styles/Header.styles";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { CartItem } from "../interfaces";
import { RootState } from "../store";
import { fetchCartItems } from "../store/slices/cartSlice";
import { logout } from "../store/slices/authSlice";
//import { debounce } from "lodash";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const cartItems = useAppSelector((state: RootState): CartItem[] => state.cart.items);
  const isLoggedIn = useAppSelector((state: RootState): boolean => state.auth.isLoggedIn);
  const username = useAppSelector((state: RootState): string | null => state.auth.user?.username ?? null);
  const cartItemCount = cartItems.length ? cartItems.reduce((total, item): number => total + item.quantity, 0) : 0;
  const dispatch = useAppDispatch();
  const routesArray = ["/", "/about", "/shops"];
  const headerTitle = ["Home", "About Us", "Shops"];

  useEffect((): (() => void) => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };
    if (!cartItems.length) dispatch(fetchCartItems());
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, [dispatch, cartItems.length]);

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

  const handleLogout = (): void => {
    dispatch(logout());
    handleLinkClick();
  };

  return (
    <StyledHeader>
      <HeaderWrapper>
        <StyledLogo to="/">
          <FaStore />
          Shopiee
        </StyledLogo>
        {isLoggedIn && <WelcomeMessage>Welcome, {username}!</WelcomeMessage>}
        <MobileMenuButton onClick={toggleMenu}>
          <FaBars />
        </MobileMenuButton>
        <Navigation isOpen={isMenuOpen} isMobile={isMobile}>
          <NavigationLinks>
            {routesArray.map(
              (route, index): JSX.Element => (
                <StyledNavLink key={route} to={route} onClick={handleLinkClick}>
                  {headerTitle[index]}
                </StyledNavLink>
              )
            )}
            <StyledCartIcon to="/cart" onClick={handleLinkClick} data-tooltip-id="tooltip-cart" data-tooltip-content="Cart">
              <FaShoppingCart />
              <span>{cartItemCount}</span>
            </StyledCartIcon>
            <StyledToolTip id="tooltip-cart" />
            {isLoggedIn ? (
              <>
                <AuthButton to="/" onClick={handleLogout} data-tooltip-id="tooltip-logout" data-tooltip-content="Logout">
                  <FaSignOutAlt />
                </AuthButton>
                <StyledToolTip id="tooltip-logout" />
              </>
            ) : (
              <>
                <AuthButton to="/login" onClick={handleLinkClick} data-tooltip-id="tooltip-login" data-tooltip-content="Login">
                  <FaSignInAlt />
                </AuthButton>
                <StyledToolTip id="tooltip-login" />
              </>
            )}
          </NavigationLinks>
        </Navigation>
      </HeaderWrapper>
    </StyledHeader>
  );
};

export default Header;
