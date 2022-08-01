import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

export default function SearchInput({
  onChange,
  defaultValue,
  onSubmit,
  setButton,
}) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
      }}
      onSubmit={onSubmit}
    >
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Cryptocurrencies"
        inputProps={{ "aria-label": "search cryptocurrencies" }}
        onChange={onChange}
        value={defaultValue}
      />
      {setButton && (
        <Button type="submit" sx={{ textTransform: "capitalize", p: "10px" }}>
          Search
        </Button>
      )}
    </Paper>
  );
}
