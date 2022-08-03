import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import StatsTable from "../component/StatsTable";

export default function CryptoDataTable({
  cryptoDetails,
  coinData,
  valueStats,
  otherStats,
}) {
  return (
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
      <Box sx={{ mt: 5 }}>
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
  );
}
