import { Box, Typography } from "@mui/material";
import React from "react";
import Navbar from "../component/Navbar";
import Herobanner from "../container/Herobanner";
import { Container } from "@mui/system";
import CardHomepage from "../component/CardHomepage";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import CustomTable from "../component/CustomTable";

export default function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading...";
  console.log(data);
  return (
    <>
      <Navbar></Navbar>
      <Herobanner></Herobanner>
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, textAlign: "center" }}>
          Crypto Global Stats
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 5 }}>
          <CardHomepage
            title="Total Cryptocurrencies"
            data={globalStats.total}
          ></CardHomepage>
          <CardHomepage
            title="Total Exchanges"
            data={millify(globalStats.totalExchanges)}
          ></CardHomepage>
          <CardHomepage
            title="Total 24h Volume"
            data={millify(globalStats.total24hVolume)}
          ></CardHomepage>
          <CardHomepage
            title="Total Market Cap"
            data={millify(globalStats.totalMarketCap)}
          ></CardHomepage>
          <CardHomepage
            title="Total Markets"
            data={millify(globalStats.totalMarkets)}
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
          data={data?.data?.coins}
        />
      </Container>
    </>
  );
}
