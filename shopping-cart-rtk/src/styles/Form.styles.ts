import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${(props): string => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px #0000001a;
  max-width: 400px;
  width: 100%;
  margin: 2rem auto;
  margin-top: 80px;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid ${(props): string => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button<{ disabled: boolean }>`
  padding: 0.75rem;
  background-color: ${({ disabled, theme }): string => (disabled ? theme.colors.button.disabled : theme.colors.button.default)};
  color: "#ffffff";
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled, theme }): string => (disabled ? theme.colors.button.disabled : theme.colors.button.hover)};
  }
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${(props): string => props.theme.colors.textDark};
`;

export const ErrorText = styled.p`
  color: ${(props): string => props.theme.colors.error};
  font-size: 0.875rem;
  margin: 0.25rem 0 1rem 0;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

export const RequiredAsterisk = styled.span`
  color: ${(props): string => props.theme.colors.error};
  margin-left: 0.25rem;
`;
