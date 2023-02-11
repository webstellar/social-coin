import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Stack,
  Box,
  Toolbar,
  List,
  Collapse,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { GrItem, GrImg, GrListItemButton } from "./DashboardLayout.styles";
import { DrawerHeader, AppBar, Drawer } from "../../config/dashboardConfig";
import BrandLogo from "../../images/hhero.png";

import { setLogout } from "../../redux/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openHero, setOpenHero] = React.useState(false);
  const [openGratitude, setOpenGratitude] = React.useState(false);

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

  const handleDropdown = () => {
    setOpenHero(!openHero);
  };
  const handleGratitudeDropdown = () => {
    setOpenGratitude(!openGratitude);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
          open={open}
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
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <TbLayoutSidebarLeftExpand />
                </IconButton>
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

        <Drawer
          variant="permanent"
          open={open}
          sx={{ color: "#fff", backgroundColor: "grey.900" }}
        >
          <DrawerHeader>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={6}
            >
              <GrItem elevation={0}>
                <Link to="/">
                  <GrImg src={BrandLogo} alt="gratitude logo" />
                </Link>
              </GrItem>
              <GrItem elevation={0}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <TbLayoutSidebarLeftExpand />
                  ) : (
                    <TbLayoutSidebarLeftCollapse />
                  )}
                </IconButton>
              </GrItem>
            </Stack>
          </DrawerHeader>
          <Divider />

          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleDropdown}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon size="large" sx={{ color: "#F6430A" }} />
                </ListItemIcon>
                <ListItemText primary="Heroes" sx={{ opacity: open ? 1 : 0 }} />
                {openHero ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openHero} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <GrListItemButton
                  component={Link}
                  to="/list/myheroes"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Heroes" />
                </GrListItemButton>
                <GrListItemButton
                  component={Link}
                  to="/create-hero"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Hero" />
                </GrListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleGratitudeDropdown}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <VolunteerActivismIcon
                    size="large"
                    sx={{ color: "#F6430A" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Gratitudes"
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {openGratitude ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openGratitude} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <GrListItemButton
                  component={Link}
                  to="/list/mygratitudes"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <VolunteerActivismIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Testimonies" />
                </GrListItemButton>
                <GrListItemButton
                  component={Link}
                  to="/create-testimony"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <AddCommentIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Testimony" />
                </GrListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding sx={{ display: "block" }}>
              <GrListItemButton
                component={Link}
                to="/my-profile"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccountCircleIcon size="large" sx={{ color: "#F6430A" }} />
                </ListItemIcon>
                <ListItemText
                  primary="View Profile"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </GrListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              <GrListItemButton
                component={Link}
                to="/edit-profile"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ManageAccountsIcon size="large" sx={{ color: "#F6430A" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Edit Profile"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </GrListItemButton>
            </ListItem>
          </List>
        </Drawer>

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
