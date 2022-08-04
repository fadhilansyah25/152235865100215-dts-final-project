import React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Skeleton,
  TableHead,
  Typography,
} from "@mui/material";
import millify from "millify";
import { formatterUSD } from "../utils/currencyFormatter";

export default function MarketExchangeTable({ theadData, data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            {theadData?.map((data, id) => (
              <TableCell
                color="secondary"
                key={id}
                align={data.align}
                colSpan={data.colSpan}
              >
                {data.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data)
            ? data?.map((data, id) => (
                <TableRow
                  key={id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell width={20}>{id + 1}</TableCell>
                  <TableCell component="th" scope="row" width={25}>
                    <Box
                      component="img"
                      sx={{ height: 25, width: 25 }}
                      src={data.iconUrl ? data.iconUrl : data.exchange.iconUrl}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {data.name ? (
                      data.name
                    ) : (
                      <>
                        <Typography
                          fontSize="14px"
                          fontWeight="600"
                        >{`${data?.base?.symbol}/${data?.quote?.symbol}`}</Typography>
                        <Typography variant="caption">
                          {data?.exchange?.name}
                        </Typography>
                      </>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontSize="14px" fontWeight="600">
                      {`$ ${millify(Number(data["24hVolume"]), {
                        space: true,
                        precision: 2,
                        units: [
                          "",
                          "K",
                          "Million",
                          "Billion",
                          "Trillion",
                          "Quadrillion",
                          "Quintillion",
                        ],
                      })}`}
                    </Typography>
                    <Typography fontSize="14px" fontWeight="600">
                      {Number(data["price"]) < 1000
                        ? `${formatterUSD(data["price"])}`
                        : `$ ${millify(Number(data["price"]), {
                            space: true,
                            precision: 2,
                            units: [
                              "",
                              "K",
                              "Million",
                              "Billion",
                              "Trillion",
                              "Quadrillion",
                              "Quintillion",
                            ],
                          })}`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            : [...Array(5)].map((_, id) => (
                <TableRow
                  key={id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row" width={25}>
                    <Skeleton variant="circular" width={25} height={25} />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
