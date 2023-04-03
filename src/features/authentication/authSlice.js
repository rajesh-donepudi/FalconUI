import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = action.payload;
      console.log("store", action.payload);
    },
    updateCredentials: (state, action) => {
      state.user = {
        ...state.user,
        jwtToken: action.payload.jwtToken,
        refreshToken: action.payload.refreshToken,
      };
    },
    logOut: (state, action) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut, updateCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth?.user;
export const selectCurrentToken = (state) => state.auth?.user?.jwtToken;
export const selectCurrentRefreshToken = (state) =>
  state.auth?.user?.refreshToken;
