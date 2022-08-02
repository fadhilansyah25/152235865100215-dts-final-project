import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { Skeleton } from "@mui/material";

export default function AutoComplete({handleSubmit}) {
  const { data } = useGetCryptosQuery(100);
  const cryptos = data?.data?.coins;

  return (
    <Box display="block" sx={{ p: "10px 0", mb: 2 }}>
      {Array.isArray(cryptos) ? (
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={cryptos?.map((option) => option.name)}
          renderInput={(params) => (
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                p: "2px 5px",
              }}
              onSubmit={handleSubmit}
            >
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <TextField
                variant="standard"
                {...params}
                sx={{
                  ml: 1,
                  ".MuiOutlinedInput-root, .MuiAutocomplete-input": {
                    fontSize: "0.9rem",
                  },
                }}
                placeholder="Search Crypto News"
                name="cryptoSearch"
              />
            </Paper>
          )}
        />
      ) : (
        <Skeleton animation="wave" height={70} />
      )}
    </Box>
  );
}
