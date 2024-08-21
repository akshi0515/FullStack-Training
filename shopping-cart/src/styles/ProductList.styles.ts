import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin: 50px auto;
  max-width: 90%;
  padding: 0 20px;
`;

export const ProductCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px #0000001a;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px #00000026;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  padding: 10px;
`;

export const ProductInfo = styled.div`
  padding: 20px;
`;

export const ProductTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 10px;
  color: #333333;
  min-height: 40px;
`;

export const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #e91e63;
  margin: 10px 0;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 15px;
  min-height: 50px;
`;

export const DescriptionLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    color: #0056b3;
    text-decoration: none;
  }
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  span {
    margin-left: 5px;
    color: #666666;
    font-size: 14px;
  }
`;

export const AddToCartButton = styled.button`
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Popup = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: #ffffff;
  padding: 15px 20px;
  border-radius: 4px;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;
