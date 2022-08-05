import React from "react";
import { Card, CardContent, Skeleton, Typography, Stack } from "@mui/material";
import {millifyNumber} from '../utils/currencyFormatter'

export default function CardHomepage({ title, data, prefix, setMil }) {
  return data ? (
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
          {prefix ? `${prefix} ` : null}
          {setMil
            ? millifyNumber(data)
            : Number(data).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  ) : (
    <Card
      variant="outlined"
      sx={{
        minWidth: 180,
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Skeleton animation="wave" variant="text" />
          <Skeleton animation="wave" variant="text" />
        </Stack>
      </CardContent>
    </Card>
  );
}
