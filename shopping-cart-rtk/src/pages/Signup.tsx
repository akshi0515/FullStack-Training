import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, clearError } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { FormContainer, Input, Button, Form, ErrorText, Label, RequiredAsterisk } from "../styles/Form.styles";
import { Title } from "../styles/ProductDetails.styles";

const Signup = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, error } = useAppSelector((state) => state.auth);

  const validatePassword = (password: string): string => {
    const hasMinimumLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (!hasMinimumLength) return "Password must be at least 8 characters long";
    if (!hasSpecialChar) return "Password must include at least one special character";
    if (!hasUpperCase) return "Password must include at least one uppercase letter";
    return "";
  };

  const handlePasswordBlur = (): void => {
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleConfirmPasswordBlur = (): void => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const isFormValid = (): boolean => {
    return (
      username.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      passwordError === "" &&
      confirmPasswordError === ""
    );
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!isFormValid()) return;
    dispatch(register({ username, password }));
  };

  useEffect((): void => {
    if (error === "User already exists") {
      alert(error);
      dispatch(clearError());
    } else if (isLoggedIn) {
      navigate("/");
    }
  }, [error, isLoggedIn, navigate, dispatch]);

  return (
    <FormContainer>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Username<RequiredAsterisk>*</RequiredAsterisk>
        </Label>
        <Input type="text" placeholder="Username" value={username} onChange={(e): void => setUsername(e.target.value)} required />

        <Label>
          Password<RequiredAsterisk>*</RequiredAsterisk>
        </Label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e): void => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          required
        />
        {passwordError && <ErrorText>{passwordError}</ErrorText>}

        <Label>
          Confirm Password<RequiredAsterisk>*</RequiredAsterisk>
        </Label>
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e): void => setConfirmPassword(e.target.value)}
          onBlur={handleConfirmPasswordBlur}
          required
        />
        {confirmPasswordError && <ErrorText>{confirmPasswordError}</ErrorText>}

        <Button type="submit" disabled={!isFormValid()}>
          Register
        </Button>
      </Form>
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </FormContainer>
  );
};

export default Signup;
