import React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TrendingCoinTable({ data, title, emojiUrl }) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Box
                component="img"
                src={emojiUrl}
                alt="fire icon"
                sx={{ maxWidth: 25 }}
              ></Box>
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell align="right">Symbol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data)
            ? data?.map((data, id) => (
                <TableRow
                  key={data.uuid}
                  sx={{ cursor: "pointer", "td,th": { border: 0, py: 1.5 } }}
                  hover
                  onClick={() =>
                    navigate(`/cryptocurrencies/details/${data.uuid}`)
                  }
                >
                  <TableCell component="th" scope="row">
                    {id + 1}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <Box
                        component="img"
                        sx={{ maxHeight: 25, mr: 1 }}
                        src={data.iconUrl}
                      />
                      {data.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{data.symbol}</TableCell>
                </TableRow>
              ))
            : [...Array(3)].map((_, id) => (
                <TableRow key={id} sx={{ "td,th": { border: 0, py: 1.5 } }}>
                  <TableCell component="th" scope="row">
                    <Skeleton />
                  </TableCell>
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <Skeleton
                      variant="circular"
                      sx={{ mr: 1 }}
                      width={25}
                      height={25}
                    />
                    <Skeleton sx={{ width: "100px" }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
