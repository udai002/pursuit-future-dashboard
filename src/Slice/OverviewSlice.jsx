import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const revenueApi = createApi({
  reducerPath: "revenueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem("session_token"));
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProjectedRevenue: builder.query({
      query: () => "/student/payments", 
    }),
  }),
});

export const { useGetProjectedRevenueQuery } = revenueApi;
