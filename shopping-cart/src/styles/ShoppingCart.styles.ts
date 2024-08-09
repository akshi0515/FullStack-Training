import styled from "styled-components";

export const CartContainer = styled.div`
  border: 1px solid #dddddd;
  padding: 20px;
  margin-top: 80px;
  background-color: #ffffff;
  color: #333333;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

export const CartContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  min-height: 400px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CartTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  flex: 1;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #dddddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 14px;

    th,
    td {
      padding: 10px;
    }
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

export const QuantityButton = styled.button`
  background-color: #494d49;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 3px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a5e5a;
  }
`;

export const RemoveButton = styled.button`
  border: none;
  color: #ff4d4d;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff0000;
  }
`;

export const ProductImage = styled.img`
  max-width: 100px;
  height: auto;
  border-radius: 5px;

  @media (max-width: 768px) {
    max-width: 60px;
  }
`;

export const CartTotals = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px #0000001a;
  align-self: flex-start;

  @media (max-width: 768px) {
    width: 90%;
    align-self: stretch;
  }

  h3 {
    margin-bottom: 15px;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 10px;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .total {
    font-weight: bold;
    font-size: 1.1em;
    margin-top: 10px;
    border-top: 1px solid #dddddd;
    padding-top: 10px;
  }
`;

export const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 50px;
  color: #888888;
  width: 90%;

  svg {
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
