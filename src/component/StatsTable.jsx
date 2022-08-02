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
} from "@mui/material";

export default function StatsTable({valueStats}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableBody>
          {Array.isArray(valueStats)
            ? valueStats?.map((data, id) => (
                <TableRow
                  key={id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row" width={25}>
                    <Box
                      component="img"
                      sx={{height: 25, width: 25 }}
                      src={data.iconUrl}
                    />
                  </TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    {data.value}
                  </TableCell>
                </TableRow>
              ))
            : [...Array(6)].map((_, id) => (
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
