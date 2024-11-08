import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";

export const GrItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0)",
  padding: theme.spacing(0.1),
  textAlign: "center",
  color: "grey.900",
  fontSize: "1.2rem",
}));

export const GrLink = styled(Link)({
  textDecoration: "none",
  cursor: "pointer",

  "&:active": {
    color: "#F6430A",
  },

  "&:hover": {
    color: "#F6430A",
  },
});

export const GrImg = styled("img")(({ theme }) => ({
  width: "270px",
  height: "37px",
  [theme.breakpoints.down("md")]: {
    width: "200px",
    height: "24px",
  },
}));

export const GrListItemButton = styled(ListItemButton)({
  "&:hover": {
    backgroundColor: "rgba(246, 67, 10, 0.5)",
  },
  "&:active": {
    backgroundColor: "#f6430a",
  },
});
