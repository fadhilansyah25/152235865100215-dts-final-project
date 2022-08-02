import React from "react";
import { Container, Box } from "@mui/system";
import Logo from "../assets/img/logo.svg";
import { Typography, List, Link } from "@mui/material";

const list1 = ["Company", "About", "Careers", "Press", "News", "Merch"];
const list2 = [
  "Privacy and Terms of service",
  "CoinFlip Privacy Policy",
  "CoinFlip Biometrics Privacy Policy",
  "CoinFlip Financial Privacy Notice",
  "CoinFlip Terms of Service",
  "CoinFlip Trade Desk Terms of Service",
];

export default function Footer() {
  return (
    <Box sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.7)" }}>
      <Container maxWidth="lg" sx={{ pt: 8, mb: 5 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={12}>
          <Box gridColumn="span 4">
            <Box
              component="img"
              sx={{
                display: { xs: "none", md: "flex" },
                textDecoration: "none",
              }}
              src={Logo}
            />
            <Typography
              component="div"
              variant="caption"
              sx={{ mt: 2 }}
              color="text.secondary"
            >
              CoinFlip, is the world's most-referenced price-tracking website
              for cryptoassets in the rapidly growing cryptocurrency space.
              <br />
              <br />
              Its mission is to make crypto discoverable and efficient globally
              by empowering retail users with unbiased, high quality and
              accurate information for drawing their own informed conclusions.{" "}
            </Typography>
          </Box>
          <Box gridColumn="span 4">
            <List>
              {list1.map((item, id) =>
                id === 0 ? (
                  <Link
                    key={id}
                    variant="body"
                    component="button"
                    sx={{
                      textDecoration: "none",
                      display: "block",
                      color: "rgba(255, 255, 255, 0.7)",
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </Link>
                ) : (
                  <Link
                    key={id}
                    variant="caption"
                    component="button"
                    sx={{
                      textDecoration: "none",
                      display: "block",
                      color: "rgba(255, 255, 255, 0.7)",
                      mb: 2,
                    }}
                  >
                    {item}
                  </Link>
                )
              )}
            </List>
          </Box>
          <Box gridColumn="span 4">
            <List>
              {list2.map((item, id) =>
                id === 0 ? (
                  <Link
                    key={id}
                    variant="body"
                    component="button"
                    sx={{
                      textDecoration: "none",
                      display: "block",
                      color: "rgba(255, 255, 255, 0.7)",
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </Link>
                ) : (
                  <Link
                    key={id}
                    variant="caption"
                    component="button"
                    sx={{
                      textDecoration: "none",
                      display: "block",
                      color: "rgba(255, 255, 255, 0.7)",
                      mb: 2,
                    }}
                  >
                    {item}
                  </Link>
                )
              )}
            </List>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
