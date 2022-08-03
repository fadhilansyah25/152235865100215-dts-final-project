import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../container/Footer";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoExchangesQuery,
  useGetCryptoMarketsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoOhlcQuery,
} from "../services/cryptoApi";
import { Box, Container, Typography, Skeleton } from "@mui/material";
import LineChart from "../component/LineChart";
import CryptoDesc from "../component/CryptoDesc";
import CryptoDataTable from "../container/CryptoDataTable";
import CryptoMarketStats from "../container/CryptoMarketStats";
import {
  valueStatsDestructor,
  otherStatsDestructor,
} from "../utils/destructCryptoData";

export default function CryptoDetailsPage() {
  const { id } = useParams();
  const { data: cryptoDetails } = useGetCryptoDetailsQuery(id);
  const { data: cryptoExchange } = useGetCryptoExchangesQuery(id);
  const { data: cryptoMarkets } = useGetCryptoMarketsQuery(id);
  const { data: cryptoHistory } = useGetCryptoHistoryQuery({
    cryptoId: id,
    timePeriod: "24h",
  });
  const { data: cryptoOhlc } = useGetCryptoOhlcQuery({
    cryptoId: id,
    interval: "minute",
    limit: 1,
  });
  const coinData = cryptoDetails?.data?.coin;
  const exchanges = cryptoExchange?.data?.exchanges;
  const markets = cryptoMarkets?.data?.markets;
  const priceHistory = cryptoHistory?.data;
  const ohlc = cryptoOhlc?.data;

  const valueStats = !cryptoDetails
    ? undefined
    : valueStatsDestructor(coinData);

  const otherStats = !cryptoDetails
    ? undefined
    : otherStatsDestructor(coinData);

  console.log(ohlc);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 8, mb: 5, pt: 5 }} maxWidth="lg">
        <Box display="flex" sx={{ flexFlow: "column", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, textAlign: "center", mb: 3 }}
          >
            {!coinData ? (
              <Skeleton width={700} height={75} />
            ) : (
              `${coinData?.name} Coin Statistics`
            )}
          </Typography>
        </Box>
        <LineChart coinHistory={priceHistory} coinName="Bitcoin" />
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 2fr)"
          sx={{ gridGap: 70 }}
        >
          <CryptoDesc coinData={coinData} />
          <CryptoDataTable
            coinData={coinData}
            cryptoDetails={cryptoDetails}
            otherStats={otherStats}
            valueStats={valueStats}
          />
        </Box>
        <CryptoMarketStats
          coinData={coinData}
          exchanges={exchanges}
          markets={markets}
        />
      </Container>
      <Footer />
    </>
  );
}
