import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info"))
    : null,
    token : localStorage.getItem("token") || null,
     isSidebarOpen : localStorage.getItem("isSidebarOpen")
     ? JSON.parse(localStorage.getItem("isSidebarOpen"))
     : false, //
};

const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token
      localStorage.setItem("user-info", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user-info");
      localStorage.removeItem("token")
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
      localStorage.setItem("isSidebarOpen", JSON.stringify(action.payload))
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer