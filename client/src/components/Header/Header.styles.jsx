import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export const GrAppBar = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0, 0, 0),
  },
}));

export const GrToolBar = styled(Toolbar)(({ theme }) => ({
  paddingLeft: "0px",
  paddingRight: "0px",
}));

export const GrHamburger = styled(MenuIcon)({});

export const GrSearch = styled(SearchIcon)({});

export const GrImg = styled("img")(({ theme }) => ({
  width: "150px",
  height: "35px",
  [theme.breakpoints.down("md")]: {
    width: "100px",
    height: "23px",
  },
}));

export const GrLink = styled(Link)({
  textDecoration: "none",
  color: "#000",
});

export const GrBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  /*
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
  */
}));
