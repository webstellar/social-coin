import { styled } from "@mui/material/styles";
import { Typography, Paper, CardMedia } from "@mui/material";

export const GrStoriesTypography = styled(Typography)(({ theme }) => ({
  lineHeight: "normal",
  marginTop: "1rem",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
}));

export const GrItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0)",
  padding: theme.spacing(0),
  textAlign: "center",
  color: "grey.900",
}));

export const GrCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 120,
  height: 240,
  objectFit: "cover",
  display: {
    xs: "block",
    sm: "block",
    filter: "grayscale(100%)",
    "&:hover": {
      filter: "grayscale(0%)",
    },
  },
  [theme.breakpoints.down("md")]: {
    height: 180,
  },
}));
