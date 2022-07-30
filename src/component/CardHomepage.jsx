import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function CardHomepage({ title, data }) {
  return (
    <Card
    variant="outlined"
      sx={{
        minWidth: 180,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            background:
              "-webkit-linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 600,
          }}
        >
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
}
