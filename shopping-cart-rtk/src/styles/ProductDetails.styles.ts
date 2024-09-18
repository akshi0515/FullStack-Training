import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  background-color: ${(props): string => props.theme.colors.background};

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 3rem;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props): string => props.theme.colors.white};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex: 1;
    padding: 2rem;
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

export const ProductImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;

  @media (min-width: 768px) {
    max-height: 500px;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    flex: 1;
  }
`;

export const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: ${(props): string => props.theme.colors.title};

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props): string => props.theme.colors.priceColor};
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const Rating = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${(props): string => props.theme.colors.textDark};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (min-width: 768px) {
    padding: 1.2rem;
  }
`;

export const AddToCartButton = styled(Button)`
  background-color: ${(props): string => props.theme.colors.button.default};
  color: ${(props): string => props.theme.colors.white};

  &:hover {
    background-color: ${(props): string => props.theme.colors.button.hover};
  }
`;

export const BuyNowButton = styled(Button)`
  background-color: ${(props): string => props.theme.colors.button.buyNow};
  color: ${(props): string => props.theme.colors.white};

  &:hover {
    background-color: ${(props): string => props.theme.colors.button.buyNowHover};
  }
`;

export const Popup = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props): string => props.theme.colors.popup};
  color: ${(props): string => props.theme.colors.white};
  padding: 1rem 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 10px #0000001a;
  z-index: 1000;
  opacity: 0.9;

  @media (min-width: 768px) {
    top: 5%;
  }
`;
