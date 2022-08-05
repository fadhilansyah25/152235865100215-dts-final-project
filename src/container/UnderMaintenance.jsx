import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

import Image from "../assets/img/maintenance.svg";
import Logo from "../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

export default function UnderMaintenance() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", pt: 5, mt: 5 }}>
      <Stack justifyContent="center">
        <Box
          component="img"
          sx={{ maxHeight: 40, my: 3 }}
          src={Logo}
          alt="under construction"
        />
        <Box
          component="img"
          sx={{ maxHeight: 300, my: 3 }}
          src={Image}
          alt="under construction"
        />
        <Typography
          component="div"
          sx={{ my: 3 }}
          textAlign="center"
          variant="h5"
        >
          This feature will available soon.
        </Typography>
        <Button
          sx={{ mx: "auto" }}
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Stack>
    </Container>
  );
}
