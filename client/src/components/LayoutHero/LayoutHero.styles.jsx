import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const GrParaBox = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(4, 0, 4),
  pr: { md: 0 },

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2, 0, 2),
  },
}));
