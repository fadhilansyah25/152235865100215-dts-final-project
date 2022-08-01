import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_CRYPTO_API_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_CRYPTO_API_HOST,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getGlobalStats: builder.query({
      query: () => createRequest("/stats"),
    }),
    getCryptosByName: builder.query({
      query: (name) => createRequest(`/coins?limit=100&search=${name}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetGlobalStatsQuery,
  useGetCryptosByNameQuery,
} = cryptoApi;
