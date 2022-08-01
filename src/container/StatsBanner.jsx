import React from "react";
import CustomTable from "../component/CustomTable";
import { Container } from "@mui/system";
import CardHomepage from "../component/CardHomepage";
import { Box, Typography } from "@mui/material";
import { useGetCryptosQuery } from "../services/cryptoApi";

export default function StatsBanner() {
  const { data } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, textAlign: "center" }}>
        Crypto Global Stats
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 5 }}>
        <CardHomepage
          title="Total Cryptocurrencies"
          data={globalStats?.total}
          setMil
        ></CardHomepage>
        <CardHomepage
          title="Total Exchanges"
          data={globalStats?.totalExchanges}
        ></CardHomepage>
        <CardHomepage
          title="Total 24h Volume"
          data={globalStats?.total24hVolume}
          prefix="$"
          setMil
        ></CardHomepage>
        <CardHomepage
          title="Total Market Cap"
          data={globalStats?.totalMarketCap}
          prefix="$"
          setMil
        ></CardHomepage>
        <CardHomepage
          title="Total Markets"
          data={globalStats?.totalMarkets}
          setMil
        ></CardHomepage>
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, my: 2, textAlign: "center" }}
      >
        Top 10 Cryptocurrencies in the world
      </Typography>
      <CustomTable
        titleData={[
          "#Rank",
          "Name",
          "Symbol",
          "Price",
          "24h %",
          "Market Cap",
          "Volume(24h)",
        ]}
        data={data?.data.coins}
      />
    </Container>
  );
}
