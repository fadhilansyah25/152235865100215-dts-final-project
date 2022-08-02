import React, { useState } from "react";
import CustomTable from "../component/CustomTable";
import { Container } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { useGetCryptosByNameQuery } from "../services/cryptoApi";
import GlobalStats from "../component/GlobalStats";
import SearchInput from "../component/SearchInput";
import Divider from "@mui/material/Divider";

export default function CryptoSearch() {
  const [searchCryp, setSearchCryp] = useState("");
  const { data, isFetching } = useGetCryptosByNameQuery(searchCryp);

  const searchInputOnChange = (e) => {
    setSearchCryp(e.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 5, pt: 5 }}>
      <GlobalStats />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 5,
          flexFlow: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, my: 2, textAlign: "center" }}
        >
          All Cryptocurrencies around the world
        </Typography>
        <SearchInput
          defaultValue={searchCryp}
          placeholder="Search Cryptocurrencies"
          onChange={searchInputOnChange}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        />
        <Divider sx={{ height: 15 }} orientation="horizontal" />
      </Box>
      <CustomTable
        titleData={[
          "#Rank",
          "Name",
          "Symbol",
          "Price",
          "24h %",
          "Market Cap",
          "Volume(24h)",
        ]}
        data={data?.data?.coins}
        setNumber
        setPagination
        isFetching={isFetching}
      />
    </Container>
  );
}
