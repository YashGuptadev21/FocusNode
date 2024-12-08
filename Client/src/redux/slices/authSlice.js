import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info"))
    : null,

  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user-info", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user-info");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
      localStorage.setItem("isSidebarOpen", JSON.stringify(action.payload))
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer