import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: ${(props): string => props.theme.colors.headerBackground};
  color: ${(props): string => props.theme.colors.white};
  padding: 0.5rem 2rem;
  box-shadow: 0 2px 5px #0000001a;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 90%;
  margin: 0 auto;
`;

export const StyledLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props): string => props.theme.colors.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
  }
`;

export const WelcomeMessage = styled.span`
  font-size: 1rem;
  margin-left: 1rem;
  color: ${(props): string => props.theme.colors.white};
`;

export const Navigation = styled.nav<{ isOpen: boolean; isMobile: boolean }>`
  display: ${({ isOpen, isMobile }) => (isMobile && !isOpen ? "none" : "block")};
  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${(props): string => props.theme.colors.headerBackground};
    padding: 1rem;
  }
`;

export const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: ${(props): string => props.theme.colors.white};
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  transition: color 0.3s ease;
  &:hover {
    color: ${(props): string => props.theme.colors.hoverNavLinks};
  }
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

export const StyledCartIcon = styled(StyledNavLink)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  position: relative;
  span {
    margin-left: 0.5rem;
    background-color: #f0f0f0;
    color: #131212;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${(props): string => props.theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const AuthButton = styled(StyledNavLink)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

export const StyledToolTip = styled(Tooltip)`
  max-width: 300px;
  background-color: #333;
  color: ${(props): string => props.theme.colors.white};
  padding: 0.2rem;
  border-radius: 2px;
  font-size: 0.2rem;
  &:before {
    border-color: #333 transparent transparent transparent;
  }
`;
