import { formatterUSD } from "../utils/currencyFormatter";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import millify from "millify";

export function valueStatsDestructor(coinData) {
  return [
    {
      title: "Price to USD",
      iconUrl:
        "https://cdn.coinranking.com/assets/951c7d742b03901d025cbf6ed2cfd1e2.svg",
      value: `${formatterUSD.format(coinData?.price).replace(/^(\D+)/, "$1 ")}`,
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
            {dayjs.unix(coinData?.allTimeHigh?.timestamp).format("DD/MM/YYYY")}
          </Typography>
        </>
      ),
    },
  ];
}

export function otherStatsDestructor(coinData) {
  return [
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
}
