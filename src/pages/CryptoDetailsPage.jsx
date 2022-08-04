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
import {
  Box,
  Container,
  Typography,
  Skeleton,
  Chip,
  Stack,
} from "@mui/material";
import LineChart from "../component/LineChart";
import CryptoDesc from "../component/CryptoDesc";
import CryptoDataTable from "../container/CryptoDataTable";
import CryptoMarketStats from "../container/CryptoMarketStats";
import {
  valueStatsDestructor,
  otherStatsDestructor,
} from "../utils/destructCryptoData";
import { formatterUSD } from "../utils/currencyFormatter";

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
    interval: "day",
    limit: 1,
  });
  const coinData = cryptoDetails?.data?.coin;
  const exchanges = cryptoExchange?.data?.exchanges;
  const markets = cryptoMarkets?.data?.markets;
  const priceHistory = cryptoHistory?.data;
  const [ohlc] = cryptoOhlc ? cryptoOhlc?.data?.ohlc : [undefined];

  const valueStats = !cryptoDetails
    ? undefined
    : valueStatsDestructor(coinData);

  const otherStats = !cryptoDetails
    ? undefined
    : otherStatsDestructor(coinData);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 8, mb: 5, pt: 5 }} maxWidth="lg">
        {/* <Box display="flex" sx={{ flexFlow: "column", alignItems: "center" }}>
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
        </Box> */}
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              component="img"
              src={coinData?.iconUrl}
              alt={coinData?.name}
              sx={{ maxHeight: 30 }}
            />
            <Typography variant="h6" fontWeight="600">
              {coinData?.name}
            </Typography>
            <Typography variant="body2" color="secondary" fontWeight="400">
              {coinData?.symbol}
            </Typography>
            <Chip
              sx={{ borderRadius: 1 }}
              size="small"
              variant="outlined"
              color="secondary"
              label={`#${coinData?.rank}`}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="secondary" variant="h6">
              Price
            </Typography>
            <Typography variant="h6" fontWeight="700">
              {formatterUSD(coinData?.price)}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{ mt: 2 }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row">
            <Typography color="secondary" sx={{ mr: 1 }} variant="caption">
              Open
            </Typography>
            <Typography variant="caption" fontWeight="700">
              {ohlc ? formatterUSD(ohlc?.open) : <Skeleton width={100} />}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography color="secondary" sx={{ mr: 1 }} variant="caption">
              High
            </Typography>
            <Typography variant="caption" fontWeight="700">
              {ohlc ? formatterUSD(ohlc?.high) : <Skeleton width={100} />}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography color="secondary" sx={{ mr: 1 }} variant="caption">
              Low
            </Typography>
            <Typography variant="caption" fontWeight="700">
              {ohlc ? formatterUSD(ohlc?.low) : <Skeleton width={100} />}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography color="secondary" sx={{ mr: 1 }} variant="caption">
              Average
            </Typography>
            <Typography variant="caption" fontWeight="700">
              {ohlc ? formatterUSD(ohlc?.avg) : <Skeleton width={100} />}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography color="secondary" sx={{ mr: 1 }} variant="caption">
              Close
            </Typography>
            <Typography variant="caption" fontWeight="700">
              {ohlc ? formatterUSD(ohlc?.close) : <Skeleton width={100} />}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography color="secondary" sx={{ mr: 1 }} variant="caption">
              24H
            </Typography>
            <Typography
              variant="caption"
              color={
                Number(coinData?.change) < 0
                  ? "#ea3943"
                  : Number(coinData?.change) === 0
                  ? "gray"
                  : "#16c784"
              }
              fontWeight="700"
            >
              {coinData ? (
                coinData?.change === null || !Number(coinData?.change) === 0 ? (
                  "-"
                ) : (
                  `${Number(coinData?.change) >= 0 ? "+" : ""}${Number(
                    coinData?.change
                  ).toFixed(2)}%`
                )
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
          </Stack>
        </Stack>
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
