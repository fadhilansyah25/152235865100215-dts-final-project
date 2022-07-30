import React from "react";
import {
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { formatter } from "../utils/currencyFormatter";

export default function CustomTable({ titleData = [], data = [] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {titleData?.map((title, id) =>
              id > 1 ? (
                <TableCell sx={{ fontWeight: 800 }} key={id} align="right">
                  {title}
                </TableCell>
              ) : (
                <TableCell sx={{ fontWeight: 800 }} key={id}>
                  {title}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.uuid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.rank}
              </TableCell>
              <TableCell sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  sx={{ width: 25, mr: 1 }}
                  src={row.iconUrl}
                />
                {row.name}
              </TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">{formatter.format(row.price)}</TableCell>
              <TableCell align="right">{row.change} %</TableCell>
              <TableCell align="right">
                {formatter.format(row.marketCap)}
              </TableCell>
              <TableCell align="right">
                {formatter.format(row["24hVolume"])}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
