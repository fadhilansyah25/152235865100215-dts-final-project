import React from "react";
import { useGetGlobalStatsQuery } from "../services/cryptoApi";
import {
  Box,
  Typography,
} from "@mui/material";
import CardHomepage from "./CardHomepage";
import TrendingCoinTable from "./TrendingCoinTable";

export default function GlobalStats() {
  const { data: globalStats } = useGetGlobalStatsQuery();

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: 700, textAlign: "center" }}>
        Crypto Global List
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 5 }}>
        <CardHomepage
          title="Total Cryptocurrencies"
          data={globalStats?.data?.totalCoins}
        ></CardHomepage>
        <CardHomepage
          title="Total Exchanges"
          data={globalStats?.data?.totalExchanges}
        ></CardHomepage>
        <CardHomepage
          title="Total 24h Volume"
          data={globalStats?.data?.total24hVolume}
          prefix="$"
          setMil
        ></CardHomepage>
        <CardHomepage
          title="Total Market Cap"
          data={globalStats?.data?.totalMarketCap}
          prefix="$"
          setMil
        ></CardHomepage>
        <CardHomepage
          title="Total Markets"
          data={globalStats?.data?.totalMarkets}
        ></CardHomepage>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5}>
        <Box gridColumn="span 6">
          <TrendingCoinTable
            data={globalStats?.data?.bestCoins}
            title="Trending"
            emojiUrl="https://s2.coinmarketcap.com/static/cloud/img/TrendingIcon.png?_=948d22e"
          />
        </Box>
        <Box gridColumn="span 6">
          <TrendingCoinTable
            data={globalStats?.data?.newestCoins}
            title="Recently Added"
            emojiUrl="https://s2.coinmarketcap.com/static/cloud/img/AddIcon.png?_=948d22e"
          />
        </Box>
      </Box>
    </>
  );
}
