import React, { useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../container/Footer";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoExchangesQuery,
  useGetCryptoMarketsQuery,
} from "../services/cryptoApi";
import { Box, Container, Typography, Skeleton, Button } from "@mui/material";
import millify from "millify";
import { formatterUSD } from "../utils/currencyFormatter";
import dayjs from "dayjs";
import StatsTable from "../component/StatsTable";
import MarketExchangeTable from "../component/MarketExchangeTable";

export default function CryptoDetailsPage() {
  const { id } = useParams();
  const { data: cryptoDetails } = useGetCryptoDetailsQuery(id);
  const { data: cryptoExchange } = useGetCryptoExchangesQuery(id);
  const { data: cryptoMarkets } = useGetCryptoMarketsQuery(id);
  const [readMore, setReadMore] = useState(false);
  const coinData = cryptoDetails?.data?.coin;
  const exchanges = cryptoExchange?.data?.exchanges;
  const markets = cryptoMarkets?.data?.markets;

  console.info(markets);

  const valueStats = !cryptoDetails
    ? undefined
    : [
        {
          title: "Price to USD",
          iconUrl:
            "https://cdn.coinranking.com/assets/951c7d742b03901d025cbf6ed2cfd1e2.svg",
          value: `${formatterUSD
            .format(coinData?.price)
            .replace(/^(\D+)/, "$1 ")}`,
        },
        {
          title: "Price to BTC",
          iconUrl:
            "https://cdn.coinranking.com/assets/92450b2db1f110cacdcf0c026ba4f7dc.svg",
          value: `${Number(coinData?.btcPrice).toFixed(5)} Btc`,
        },
        {
          title: "Rank",
          iconUrl:
            "https://cdn.coinranking.com/assets/6f7ccd00b040a49cda03164c2e2099f1.svg",
          value: coinData?.rank,
        },
        {
          title: "24h volume",
          iconUrl:
            "https://cdn.coinranking.com/assets/cc0a9867b762260e833f57a350d17ae3.svg",
          value: `$ ${millify(Number(coinData?.["24hVolume"]), {
            space: true,
            precision: 3,
            units: [
              "",
              "K",
              "Million",
              "Billion",
              "Trillion",
              "Quadrillion",
              "Quintillion",
            ],
          })}`,
        },
        {
          title: "Market cap",
          iconUrl:
            "https://cdn.coinranking.com/assets/f074e22af76466f9bcfff727911af5c1.svg",
          value: `$ ${millify(Number(coinData?.marketCap), {
            space: true,
            precision: 3,
            units: [
              "",
              "K",
              "Million",
              "Billion",
              "Trillion",
              "Quadrillion",
              "Quintillion",
            ],
          })}`,
        },
        {
          title: "All-time high (daily avg.)",
          iconUrl:
            "https://cdn.coinranking.com/assets/6b49c13d629d6937b5f7b5a916c457cd.svg",
          value: (
            <>
              <Typography fontSize="14px" fontWeight="700">
                ${" "}
                {millify(Number(coinData?.allTimeHigh?.price), {
                  space: true,
                  precision: 3,
                  units: [
                    "",
                    "K",
                    "Million",
                    "Billion",
                    "Trillion",
                    "Quadrillion",
                    "Quintillion",
                  ],
                })}
              </Typography>
              <Typography variant="caption">
                on{" "}
                {dayjs
                  .unix(coinData?.allTimeHigh?.timestamp)
                  .format("DD/MM/YYYY")}
              </Typography>
            </>
          ),
        },
      ];

  const otherStats = !cryptoDetails
    ? undefined
    : [
        {
          title: "Number of markets",
          iconUrl:
            "https://cdn.coinranking.com/assets/eb3bbed23a98d5ad4df752a2f50b6ee5.svg",
          value: `${Number(coinData?.numberOfMarkets).toLocaleString()}`,
        },
        {
          title: "Number of exchanges",
          iconUrl:
            "https://cdn.coinranking.com/assets/9b0f0465e6e682715b2256f4f5e61d71.svg",
          value: `${Number(coinData?.numberOfExchanges).toLocaleString()}`,
        },
        {
          title: "Approved Supply",
          iconUrl:
            "https://cdn.coinranking.com/assets/951c7d742b03901d025cbf6ed2cfd1e2.svg",
          value: coinData?.supply?.confirmed ? "Yes" : "No",
        },
        {
          title: "Circulating Supply",
          iconUrl:
            "https://cdn.coinranking.com/assets/043e2dc0d15326856cd06cbad8896611.svg",
          value: `${millify(Number(coinData?.supply?.circulating), {
            space: true,
            precision: 3,
            units: [
              "",
              "K",
              "Million",
              "Billion",
              "Trillion",
              "Quadrillion",
              "Quintillion",
            ],
          })} ${coinData?.symbol}`,
        },
        {
          title: "Total of Supply",
          iconUrl:
            "https://cdn.coinranking.com/assets/7d54ee634f967b03459267fc21743165.svg",
          value: `${millify(Number(coinData?.supply?.total), {
            space: true,
            precision: 3,
            units: [
              "",
              "K",
              "Million",
              "Billion",
              "Trillion",
              "Quadrillion",
              "Quintillion",
            ],
          })} ${coinData?.symbol}`,
        },
        {
          title: "Tier of coin",
          iconUrl:
            "https://cdn.coinranking.com/assets/6f7ccd00b040a49cda03164c2e2099f1.svg",
          value: `#${coinData?.tier}`,
        },
      ];

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 8, mb: 5, pt: 5 }} maxWidth="lg">
        <Box display="flex" sx={{ flexFlow: "column", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, textAlign: "center", mb: 3 }}
          >
            {!cryptoDetails ? (
              <Skeleton width={700} height={50} />
            ) : (
              `${coinData?.name} Coin Statistics`
            )}
          </Typography>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 2fr)"
          sx={{ gridGap: 70 }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              What is {coinData?.name}
            </Typography>{" "}
            <Box
              component="div"
              sx={{
                p: {
                  fontSize: "14px",
                },
                maxHeight: readMore ? "auto" : 200,
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: coinData?.description }}
            />
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, textTransform: "capitalize" }}
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? "Less more" : "Read more"}
            </Button>
          </Box>
          <Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Value Statistics
              </Typography>
              <Typography
                component="div"
                variant="body2"
                color="secondary"
                sx={{ mb: 3 }}
              >
                {!cryptoDetails ? (
                  <Skeleton width={400} />
                ) : (
                  `An overview showing the statistics of ${coinData?.name}, such as the base
          and quote currency, the rank, and trading volume.`
                )}
              </Typography>
              <StatsTable valueStats={valueStats} />
            </Box>
            <Box sx={{mt: 5}}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Supply information
              </Typography>
              <Typography
                component="div"
                variant="body2"
                color="secondary"
                sx={{ mb: 3 }}
              >
                {!cryptoDetails ? (
                  <Skeleton width={400} />
                ) : (
                  `View the total and circulating supply of ${coinData?.name}, including details on how the supplies are calculated.`
                )}
              </Typography>
              <StatsTable valueStats={otherStats} />
            </Box>
          </Box>
        </Box>
        {/* <Box
          display="grid"
          gridTemplateColumns="repeat(2, 2fr)"
          sx={{ gridGap: 70, my: 5 }}
        >

        </Box> */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 2fr)"
          sx={{ gridGap: 70, my: 5 }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              {`Best exchanges to buy ${coinData?.name}`}
            </Typography>
            <Typography
              component="div"
              variant="body2"
              color="secondary"
              sx={{ mb: 3 }}
            >
              {!cryptoDetails ? (
                <Skeleton width={400} />
              ) : (
                `The top crypto exchanges that have ${coinData?.name} available for trading, ranked by 24h trading volume and the current price.
                `
              )}
            </Typography>
            <MarketExchangeTable
              theadData={[
                { title: "Exchange", align: "left", colSpan: 3 },
                { title: "24H Volume", align: "right", colSpan: 1 },
              ]}
              data={exchanges}
            />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              {`Markets`}
            </Typography>
            <Typography
              component="div"
              variant="body2"
              color="secondary"
              sx={{ mb: 3 }}
            >
              {!cryptoDetails ? (
                <Skeleton width={400} />
              ) : (
                `A list of the top ${coinData?.name} markets across all crypto exchanges based on the highest 24h trading volume, with their current price.`
              )}
            </Typography>
            <MarketExchangeTable
              theadData={[
                { title: "Market", align: "left", colSpan: 3 },
                { title: "24H Volume", align: "right", colSpan: 1 },
              ]}
              data={markets}
            />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
