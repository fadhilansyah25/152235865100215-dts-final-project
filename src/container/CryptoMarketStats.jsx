import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import MarketExchangeTable from "../component/MarketExchangeTable";

export default function CryptoMarketStats({ coinData, markets, exchanges }) {
  return (
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
          {!coinData ? (
            <Skeleton width={400} />
          ) : (
            `The top crypto exchanges that have ${coinData?.name} available for trading, ranked by 24h trading volume and the current price.`
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
          {!coinData ? (
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
  );
}
