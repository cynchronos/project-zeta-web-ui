import { createSlice } from "@reduxjs/toolkit";

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token && token !== 'undefined' ? JSON.parse(token) : null;
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    account: null,
    token: getInitialToken(),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { account, access_token } = action.payload;

      localStorage.setItem("token", JSON.stringify(access_token));

      state.account = account;
      state.token = access_token;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.account = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;