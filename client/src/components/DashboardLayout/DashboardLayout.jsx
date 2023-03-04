import * as React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Stack,
  Box,
  Toolbar,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

import AddCommentIcon from "@mui/icons-material/AddComment";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

import { GrItem, GrImg } from "./DashboardLayout.styles";
import { DrawerHeader, AppBar } from "../../config/dashboardConfig";
import BrandLogo from "../../images/hhero.png";

import { setLogout } from "../../redux/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    document.title = `My Dashboard | ${user?.user?.name}`;
  });

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    toast.info("Logged out");
  };

  //hamburger menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const username = user?.user?.name;
  const firstname = username?.split(" ")[0];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={1}
          color="default"
          sx={{ bgcolor: "background.paper" }}
        >
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={6} md={6}>
                <Link to="/" style={{ cursor: "pointer" }}>
                  <GrImg src={BrandLogo} alt="gratitude logo" />
                </Link>
              </Grid>
              <Grid item xs={6} md={6}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={2}
                >
                  <GrItem elevation={0}>
                    {user ? `Hello, ${firstname}` : "John Doe"}
                  </GrItem>
                  <GrItem elevation={0}>
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={handleMenu}
                    >
                      <Avatar
                        src={
                          user.user
                            ? user?.user?.profilePicture?.url
                            : "https://source.unsplash.com/random"
                        }
                        alt={user?.user?.name}
                        sx={{ width: 30, height: 30, borderRadius: "100px" }}
                      />
                    </IconButton>
                  </GrItem>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => navigate("/")}>
                      <HomeIcon color="secondary" sx={{ mr: 1 }} />
                      Home
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/list/myheroes")}>
                      <GroupsIcon color="secondary" sx={{ mr: 1 }} />
                      My Heroes
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/create-hero")}>
                      <PersonAddIcon color="secondary" sx={{ mr: 1 }} />
                      Add Hero
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/list/mygratitudes")}>
                      <VolunteerActivismIcon color="secondary" sx={{ mr: 1 }} />
                      My Testimonies
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/create-testimony")}>
                      <AddCommentIcon color="secondary" sx={{ mr: 1 }} />
                      Add Testimonies
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/my-profile")}>
                      <HomeIcon color="secondary" sx={{ mr: 1 }} />
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon color="secondary" sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.any,
};

export default DashboardLayout;
