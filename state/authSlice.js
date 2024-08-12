import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLogout: (state, action) => {
      state.token = null;
      state.user = null;
    },
    updateUserDetails: (state, action) => {
      if (state.user && state.user._id === action.payload._id) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setLogin, setLogout, updateUserDetails } = authSlice.actions;
export default authSlice.reducer;
