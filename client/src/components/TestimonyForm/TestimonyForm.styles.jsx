import { Paper, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const GrFormImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  filter: "grayscale(0%)",
  "&:hover": {
    filter: "grayscale(100%)",
  },
  borderRadius: "10px",
});

export const GrFormModal = styled(Box)(({ theme }) => ({}));

export const GrPaper = styled(Paper)({
  position: "relative",
  backgroundColor: "grey.800",
  color: "#fff",
  mb: 4,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
});

export const GrHeroBox = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "grey.800",
  color: "#fff",
  mb: 4,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

export const GrItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0)",
  textAlign: "center",
  color: "grey.900",
}));

export const GrBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0, 2),
  color: "#000",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3, 0, 3),
  },
}));

export const GrHeroImage = styled("img")(({ theme }) => ({
  maxWwidth: "100%",
  height: "400px",
  [theme.breakpoints.down("md")]: {
    width: 400,
    height: 280,
  },
}));

export const GrBigTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
}));

export const GrSmallTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
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

export const GrParaTypography = styled(Typography)(({ theme }) => ({
  lineHeight: "normal",
  fontWeight: "600",
  color: "grey.900",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    fontWeight: "600",
  },
}));

export const GrInput = styled("input")({
  border: "0.9px solid #888",
  padding: "0.5em 1em",
  borderRadius: "0.2em",
  fontSize: "1em",
  color: "#333",
  width: "100%",
});

export const GrGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3, 0, 3),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2, 0, 2),
  },
}));

export const GrTagTypography = styled(Typography)({
  border: 0,
  backgroundColor: "#C5C5C5",
  padding: "8px",
  borderRadius: "20px",
});
