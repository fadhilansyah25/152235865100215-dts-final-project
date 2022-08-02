import React, { useState } from "react";
import {
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Typography,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { formatterUSD } from "../utils/currencyFormatter";
import Logo from "../assets/img/logo.svg";
import TablePaginationActions from "./TablePaginationActions";
import CustomTableSkeleton from "./CustomTableSkeleton";
import { useNavigate } from "react-router-dom";

export default function CustomTable({
  titleData = [],
  data,
  setNumber,
  setPagination,
  isFetching,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {setNumber && <TableCell sx={{ fontWeight: 800 }}>No.</TableCell>}
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
          {Array.isArray(data) && !isFetching ? (
            data?.length !== 0 ? (
              (rowsPerPage > 0
                ? data?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((item, id) => (
                <TableRow
                  hover
                  key={item.uuid}
                  sx={{
                    cursor: "pointer",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  onClick={() =>
                    navigate(`/cryptocurrencies/details/${item.uuid}`)
                  }
                >
                  {setNumber && <TableCell>{id + 1}</TableCell>}
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: 800 }}
                  >
                    {item.rank}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        fontWeight: 600
                      }}
                    >
                      <Box
                        component="img"
                        sx={{ maxWidth: 25, maxHeight: 25, mr: 1 }}
                        src={item.iconUrl}
                      />
                      {item.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{item.symbol}</TableCell>
                  <TableCell align="right">
                    {formatterUSD.format(item.price)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: `${
                        Number(item.change) < 0 ? "#ea3943" : "#16c784"
                      }`,
                    }}
                  >
                    {item.change === null ? "-" : `${item.change} %`}
                  </TableCell>
                  <TableCell align="right">
                    {formatterUSD.format(item.marketCap)}
                  </TableCell>
                  <TableCell align="right">
                    {formatterUSD.format(item["24hVolume"])}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={8} sx={{ fontWeight: 800 }}>
                  <Box
                    display="flex"
                    sx={{
                      flexFlow: "column",
                      alignItems: "center",
                      rowGap: 5,
                      py: 5,
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        display: { xs: "none", md: "flex" },
                        textDecoration: "none",
                        width: 250,
                      }}
                      src={Logo}
                    />
                    <Typography>Coin you've search not found.</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )
          ) : (
            <CustomTableSkeleton setNumber />
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 57.5 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter
          sx={{ display: (!setPagination || !Array.isArray(data)) && "none" }}
        >
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 15, 25, { label: "All", value: -1 }]}
              colSpan={8}
              count={data ? data?.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
