import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchPropertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
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
