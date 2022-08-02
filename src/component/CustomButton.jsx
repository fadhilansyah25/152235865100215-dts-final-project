import React from "react";
import { Button } from "@mui/material";

export default function CustomButton({children, stye}) {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          mt: 3,
          background: "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
          textTransform: "capitalize",
          fontWeight: 600,
          color: "white",
          p: ".5rem 2rem",
          transition: "background 0.7s",
          "&:hover": {
            background: "#933FFE",
            fontWeight: 700,
          },
        }}
      >
        {children}
      </Button>
    </>
  );
}
