import { createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const API_URI = import.meta.env.VITE_APP_BASE_URL

const baseQuery = fetchBaseQuery({ baseUrl: API_URI + "/api", credentials: "include", mode:"cors" ,prepareHeaders :(headers) =>{
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  headers.set("Content-Type", "application/json");
  return headers;
}});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
