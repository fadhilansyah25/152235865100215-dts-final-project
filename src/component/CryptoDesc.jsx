import React from "react";
import {Box, Typography, Skeleton} from '@mui/material'

export default function CryptoDesc({coinData}) {
  return coinData ? (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        What is {coinData?.name}
      </Typography>
      <Box
        component="div"
        sx={{
          p: {
            fontSize: "14px",
          },
        }}
        dangerouslySetInnerHTML={{ __html: coinData?.description }}
      />
    </Box>
  ) : (
    <Box>
      <Skeleton height={50} animation="wave" />
      <Skeleton height={250} animation="wave" />
    </Box>
  );
}
