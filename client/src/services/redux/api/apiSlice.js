import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../data/endpoint";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Admin"],
  endpoints: () => ({}),
});
