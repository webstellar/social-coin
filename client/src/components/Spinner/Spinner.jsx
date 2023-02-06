import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Spinner = () => {
  return (
    <Box sx={{ display: "flex", position: "fixed", top: "50%", left: "50%" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
};
