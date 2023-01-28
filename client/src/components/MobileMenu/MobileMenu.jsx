import { useState } from "react";
import {
  IconButton,
  Drawer,
  Button,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./MobileMenu.styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getHeroes } from "../../redux/heroes/heroesSlice";
import { setLogout } from "../../redux/auth/authSlice";

const drawerWidth = 240;
const navItems = [
  {
    id: 1,
    name: "Give",
    link: "/create-testimony",
  },
  {
    id: 2,
    name: "Our story",
    link: "/our-story",
  },
  {
    id: 3,
    name: "Profile",
    link: "/my-profile",
  },
];

const MobileMenu = (props) => {
  const { window } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    dispatch(setLogout());
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      dispatch(getHeroes(searchText));
      navigate(`/search/${searchText}`);
    } else {
      navigate("/search");
    }
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Testimony
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <form onSubmit={searchHandler}>
            <Search>
              <SearchIconWrapper type="submit" aria-label="search">
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Search>
          </form>
        </ListItem>

        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "left" }}
              component={Link}
              to={item.link}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "left", textTransform: "capitalize" }}
            component={Button}
            onClick={handleLogout}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default MobileMenu;
