import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, clearError } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { FormContainer, Input, Button, Form, Label, RequiredAsterisk } from "../styles/Form.styles";
import { Title } from "../styles/ProductDetails.styles";

const LoginPage = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, error } = useAppSelector((state) => state.auth);

  const isFormValid = (): boolean => {
    return username.trim() !== "" && password.trim() !== "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isFormValid()) return;
    dispatch(login({ username, password }));
  };

  useEffect((): void => {
    if (error === "Invalid username or password") {
      alert(error);
      dispatch(clearError());
    } else if (isLoggedIn) {
      navigate("/");
    }
  }, [error, isLoggedIn, navigate, dispatch]);

  return (
    <FormContainer>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Username<RequiredAsterisk>*</RequiredAsterisk>
        </Label>
        <Input type="text" placeholder="Username" value={username} onChange={(e): void => setUsername(e.target.value)} required />
        <Label>
          Password<RequiredAsterisk>*</RequiredAsterisk>
        </Label>
        <Input type="password" placeholder="Password" value={password} onChange={(e): void => setPassword(e.target.value)} required />
        <Button type="submit" disabled={!isFormValid()}>
          Login
        </Button>
      </Form>
      <p>
        Not yet registered? <Link to="/signup">Signup</Link>
      </p>
    </FormContainer>
  );
};

export default LoginPage;
