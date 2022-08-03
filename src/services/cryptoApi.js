import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_COINRANKING_API_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_COINRANKING_API_HOST,
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
    getCryptoDetails: builder.query({
      query: (cryptoId) => createRequest(`/coin/${cryptoId}`),
    }),
    getCryptoExchanges: builder.query({
      query: (cryptoId) =>
        createRequest(
          `/coin/${cryptoId}/exchanges?limit=5&orderBy=24hVolume&offset=0&orderDirection=desc`
        ),
    }),
    getCryptoMarkets: builder.query({
      query: (cryptoId) =>
        createRequest(
          `/coin/${cryptoId}/markets?limit=5&orderBy=24hVolume&offset=0&orderDirection=desc`
        ),
    }),
    getCryptoHistory: builder.query({
      query: ({ cryptoId, timePeriod }) =>
        createRequest(
          `/coin/${cryptoId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`
        ),
    }),
    getCryptoOhlc: builder.query({
      query: ({ cryptoId, interval, limit }) =>
        createRequest(
          `/coin/${cryptoId}/ohlc?interval=${interval}&limit=${limit}`
        ),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetGlobalStatsQuery,
  useGetCryptosByNameQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoExchangesQuery,
  useGetCryptoMarketsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoOhlcQuery
} = cryptoApi;
