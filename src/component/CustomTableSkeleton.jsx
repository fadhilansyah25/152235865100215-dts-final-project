import React from "react";
import { TableRow, TableCell, Skeleton } from "@mui/material";

export default function CustomTableSkeleton({setNumber}) {
  return [...Array(10)].map((_, id) => (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {setNumber && (
        <TableCell sx={{ fontWeight: 800 }} key={id}>
          <Skeleton />
        </TableCell>
      )}
      <TableCell component="th" scope="row">
        <Skeleton />
      </TableCell>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" sx={{ mr: 1 }} width={25} height={25} />
        <Skeleton sx={{ width: "100px" }} />
      </TableCell>
      <TableCell align="right">
        <Skeleton />
      </TableCell>
      <TableCell align="right">
        <Skeleton />
      </TableCell>
      <TableCell align="right">
        <Skeleton />
      </TableCell>
      <TableCell align="right">
        <Skeleton />
      </TableCell>
      <TableCell align="right">
        <Skeleton />
      </TableCell>
      <TableCell align="right">
        <Skeleton />
      </TableCell>
    </TableRow>
  ));
}
