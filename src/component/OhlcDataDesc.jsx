import React from "react";
import { formatterUSD } from "../utils/currencyFormatter";
import {
    Box,
    Typography,
    Skeleton,
    Chip,
    Stack,
  } from "@mui/material";

export default function OhlcDataDesc({ohlc, coinData}) {
  return (
    <>
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
    </>
  );
}
