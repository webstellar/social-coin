import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GrTypography = styled(Typography)(({ theme }) => ({
  color: "grey.900",
  fontWeight: "600",
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));
