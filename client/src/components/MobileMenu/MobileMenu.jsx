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
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../../redux/heroes/heroesSlice";
import { setLogout } from "../../redux/auth/authSlice";
import ModalLogin from "../AuthLogin/ModalLogin";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "unset",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
const drawerWidth = 240;
const navItems = [
  {
    id: 1,
    name: "Testimonies",
    link: "/testimonies",
  },
];

const MobileMenu = (props) => {
  const { window } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoggedUser = () => navigate("/create-hero");

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Testimony
      </Typography>
      <Divider />

      <Modal
        id="login"
        isOpen={open}
        onRequestClose={handleClose}
        aria={{
          labelledby: "login",
          describedby: "full_description",
        }}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Login"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <ModalLogin handleClose={handleClose} />
      </Modal>
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

        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "left", textTransform: "capitalize" }}
            component={Button}
            onClick={user ? handleLoggedUser : handleOpen}
          >
            <ListItemText primary="Write A Testimony" />
          </ListItemButton>
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
        {user?.user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "left", textTransform: "capitalize" }}
                component={Button}
                onClick={() => navigate("/my-profile")}
              >
                <ListItemText primary="My account" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "left", textTransform: "capitalize" }}
                component={Button}
                onClick={handleLogout}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : null}
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
