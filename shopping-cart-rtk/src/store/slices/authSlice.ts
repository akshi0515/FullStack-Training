import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../interfaces";

interface AuthStateWithError extends AuthState {
  error: string | null;
}

const initialState: AuthStateWithError = {
  user: null,
  isLoggedIn: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>): void => {
      const users = JSON.parse(localStorage.getItem("users") ?? "[]");
      const existingUser = users.find((u: User) => u.username === action.payload.username);

      if (existingUser) {
        state.error = "User already exists";
      } else {
        users.push(action.payload);
        localStorage.setItem("users", JSON.stringify(users));
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      }
    },

    login: (state, action: PayloadAction<User>): void => {
      const users = JSON.parse(localStorage.getItem("users") ?? "[]");
      const user = users.find((u: User) => u.username === action.payload.username && u.password === action.payload.password);
      if (user) {
        state.user = user;
        state.isLoggedIn = true;
        state.error = null;
      } else {
        state.error = "Invalid username or password";
      }
    },

    logout: (state): void => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },

    clearError: (state): void => {
      state.error = null;
    }
  }
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
