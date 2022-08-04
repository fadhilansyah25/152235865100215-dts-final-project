import {
  Container,
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
  Stack,
  Button,
} from "@mui/material";
import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../container/Footer";
import { GET_WATCHLIST, DELETE_WATCHLIST } from "../graphql/queries";
import { useSubscription, useMutation } from "@apollo/client/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.svg";

export default function WatchListPage() {
  const [user] = useAuthState(auth);
  const [deleteWatchlist] = useMutation(DELETE_WATCHLIST);
  const { data: watchlist, loading } = useSubscription(GET_WATCHLIST, {
    variables: { firebaseuid: user.uid },
  });
  const navigate = useNavigate();

  const data = watchlist?.coinflip_coin_watchlist;
  const theadData = [
    { title: "No." },
    { title: "Coin Name", colSpan: 2 },
    { title: "" },
  ];

  const handleDelete = async (id) => {
    await deleteWatchlist({ variables: { id } });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ minHeight: "100vh", pt: 5, mt: 5 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, textAlign: "center", my: 3 }}
        >
          Your Crypto Watch List
        </Typography>
        <TableContainer component={Paper} sx={{ width: 700, mx: "auto" }}>
          <Table aria-label="simple table">
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
              {!loading ? (
                data?.length !== 0 ? (
                  data?.map((data, id) => (
                    <TableRow
                      hover={true}
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
                          src={
                            data.iconUrl ? data.iconUrl : data.exchange.iconUrl
                          }
                        />
                      </TableCell>
                      <TableCell
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/cryptocurrencies/details/${data?.coinId}`)
                        }
                      >
                        <Stack direction="row" spacing={1}>
                          <Typography sx={{ fontWeight: 700 }}>
                            {data?.name}
                          </Typography>
                          <Typography color="secondary" variant="caption">
                            {data?.symbol}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          sx={{ textTransform: "capitalize" }}
                          onClick={() => handleDelete(data?.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={4}
                      sx={{ fontWeight: 800 }}
                    >
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
                        <Typography>Your watchlist still empty</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              ) : (
                [...Array(6)].map((_, id) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
}
