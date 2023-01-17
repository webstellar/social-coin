import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

export const GrBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0, 2),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3, 0, 3),
  },
}));

export const GrItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0)",
  textAlign: "center",
  color: "grey.900",
}));
