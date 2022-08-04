import React from "react";
import { Container } from "@mui/system";
import { Box, Typography } from "@mui/material";
import CustomButton from "../component/CustomButton";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function HomepageBanner() {
  const [user, loading] = useAuthState(auth);

  return (
    <Box
      sx={{
        backgroundImage: `url(${"https://images.unsplash.com/photo-1639475377520-b256a5d204b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"})`,
        height: "100vh",
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ alignSelf: "center", backdropFilter: "blur(2px)", py: 2 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: 900, textAlign: "center", width: "60%" }}
          >
            We make crypto clear and simple.
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", width: "40%", mt: 1 }}
          >
            An overview of the complete cryptocurrency market, including the
            number of cryptocurrencies, the total market cap, and trading
            volume.
          </Typography>
          {!user && loading ? (
            <CustomButton nav="/Register">Get Started</CustomButton>
          ) : (
            <CustomButton nav="/cryptocurrencies">Get Started</CustomButton>
          )}
        </Container>
      </Box>
    </Box>
  );
}
