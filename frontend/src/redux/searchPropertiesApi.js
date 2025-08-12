import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://real-estate-mern-li5w.onrender.com/api"
    : "http://localhost:5000/api";

export const searchPropertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builder) => ({
    searchProperties: builder.query({
      query: (searchParams) => (
        {
        url: '/properties/search',
        params: searchParams,
      }),
    }),
  }),
});

export const { useLazySearchPropertiesQuery } = searchPropertiesApi;
