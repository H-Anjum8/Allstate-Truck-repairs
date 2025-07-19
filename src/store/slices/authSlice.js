import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: 'manager', // 'user' | 'driver' | 'manager' | 'service_provider'
  user: null, // optional: you can store user profile data here
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.role = action.payload.role;
      state.user = action.payload.user || null;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.role = null;
      state.user = null;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUserRole } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectUserRole = state => state.auth.role;
export const selectUserData = state => state.auth.user;

export default authSlice.reducer;
