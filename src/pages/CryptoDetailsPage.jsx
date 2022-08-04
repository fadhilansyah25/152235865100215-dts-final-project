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
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import LineChart from "../component/LineChart";
import CryptoDesc from "../component/CryptoDesc";
import OhlcDataDesc from "../component/OhlcDataDesc";
import CryptoDataTable from "../container/CryptoDataTable";
import CryptoMarketStats from "../container/CryptoMarketStats";
import {
  valueStatsDestructor,
  otherStatsDestructor,
} from "../utils/destructCryptoData";
import { INSERT_WATCHLIST, GET_WATCHLIST } from "../graphql/queries";
import { useMutation, useSubscription } from "@apollo/client/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

export default function CryptoDetailsPage() {
  const { id } = useParams();
  const [user] = useAuthState(auth);
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
  const [insertWatchlist] = useMutation(INSERT_WATCHLIST);
  const { data: watchlistData, loading } = useSubscription(GET_WATCHLIST, {
    variables: { firebaseuid: user.uid },
  });

  const coinData = cryptoDetails?.data?.coin;
  const exchanges = cryptoExchange?.data?.exchanges;
  const markets = cryptoMarkets?.data?.markets;
  const priceHistory = cryptoHistory?.data;
  const watchlist = watchlistData?.coinflip_coin_watchlist;
  const [ohlc] = cryptoOhlc ? cryptoOhlc?.data?.ohlc : [undefined];

  const valueStats = !cryptoDetails
    ? undefined
    : valueStatsDestructor(coinData);

  const otherStats = !cryptoDetails
    ? undefined
    : otherStatsDestructor(coinData);

  const handleInsert = async () => {
    await insertWatchlist({
      variables: {
        firebaseuid: user.uid,
        iconUrl: coinData?.iconUrl,
        name: coinData?.name,
        symbol: coinData?.symbol,
        coinId: coinData?.uuid,
      },
    });
  };

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
        <OhlcDataDesc coinData={coinData} ohlc={ohlc} />
        <LineChart coinHistory={priceHistory} coinName="Bitcoin" />
        <Stack direction="row" justifyContent="end">
          <Button
            variant="outlined"
            sx={{ mb: 1, textTransform: "none" }}
            onClick={handleInsert}
            disabled={loading ? true : watchlist?.some((o) => o.coinId === id)}
          >
            Add to watchlist
          </Button>
        </Stack>
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
