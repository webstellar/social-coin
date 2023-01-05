import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const GrBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0, 2),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3, 0, 3),
  },
}));

export const GrBigTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
}));

export const GrTypography = styled(Typography)(({ theme }) => ({
  color: "grey.900",
  fontWeight: "600",
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

export const GrLink = styled(Link)({
  textDecoration: "none",
  color: "#F6430A",
  cursor: "pointer",
});

export const GrDiv = styled("div")({
  border: "1px solid #D9D9D9",
  borderRadius: "4px",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "0.5em",
});

export const GrInput = styled("input")({
  border: "0.9px solid #888",
  padding: "0.5em 1em",
  borderRadius: "0.2em",
  fontSize: "1em",
  color: "#333",
  width: "100%",
});
