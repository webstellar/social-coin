import { useState, useEffect } from "react";
import { GrAppBar, GrToolBar, GrImg, GrLink, GrBadge } from "./Header.styles";
import {
  Box,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  Avatar,
  MenuItem,
  Container,
  CssBaseline,
} from "@mui/material";
import BrandLogo from "../../images/hhero.svg";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import MobileMenu from "../MobileMenu/MobileMenu";
import SearchBar from "../SearchBar/SearchBar";
import ModalLogin from "../AuthLogin/ModalLogin";
import ModalRegister from "../AuthRegister/ModalRegister";

import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/auth/authSlice";

const navItems = [
  {
    id: 1,
    name: "Heroes",
    link: "/heroeslist",
    type: "text",
    variant: "h6",
    weight: "regular",
  },
];

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

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(setLogout());
  };

  //Login Popup
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSecondOpen = () => {
    setOpenSecond(true);
  };

  const handleSecondClose = () => {
    setOpenSecond(false);
  };

  //hamburger menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoggedUser = () => navigate("/create-hero");

  useEffect(() => {
    if (user) {
      handleClose();
      handleSecondClose();
    }
  });

  return (
    <div>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <GrAppBar
          position="static"
          elevation={0}
          color="default"
          sx={{ bgcolor: "background.paper", p: 0 }}
        >
          <Container maxWidth="lg">
            <GrToolBar sx={{ p: 0 }} disableGutters>
              <Box sx={{ flexGrow: 1 }} component="a" href="/">
                <GrImg src={BrandLogo} alt="gratitude logo" />
              </Box>

              <div>
                {/* Login Modal */}
                {!user ? (
                  <IconButton
                    size="large"
                    disableRipple={true}
                    color="inherit"
                    onClick={handleOpen}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      LOGIN
                    </Typography>
                  </IconButton>
                ) : (
                  <GrBadge
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    overlap="circular"
                    variant="dot"
                    sx={{ mr: 2, cursor: "pointer" }}
                    components={Button}
                    onClick={() => navigate("/my-profile")}
                  >
                    <Avatar
                      alt={user?.user?.name}
                      src={user?.user?.profilePicture?.url}
                    />
                  </GrBadge>
                )}

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

                {!isMobile && <SearchBar />}

                {!isMobile && (
                  <IconButton
                    size="large"
                    disableRipple={true}
                    color="inherit"
                    onClick={user ? handleLoggedUser : handleSecondOpen}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "regular" }}>
                      Give
                    </Typography>
                  </IconButton>
                )}

                <Modal
                  id="register"
                  isOpen={openSecond}
                  onRequestClose={handleSecondClose}
                  aria={{
                    labelledby: "register",
                    describedby: "full_description",
                  }}
                  ariaHideApp={false}
                  style={customStyles}
                  contentLabel="Register"
                  shouldCloseOnOverlayClick={true}
                  shouldCloseOnEsc={true}
                >
                  <ModalRegister handleRClose={handleSecondClose} />
                </Modal>

                {!isMobile &&
                  navItems.map((item) => (
                    <IconButton
                      key={item.id}
                      size="large"
                      disableRipple={true}
                      color="inherit"
                    >
                      <GrLink to={item.link} style={{ textDecoration: "none" }}>
                        {item.type === "text" ? (
                          <Typography
                            variant={item.variant}
                            sx={{ fontWeight: item.weight }}
                          >
                            {item.name}
                          </Typography>
                        ) : (
                          <>{item.name}</>
                        )}
                      </GrLink>
                    </IconButton>
                  ))}
                {!isMobile && (
                  <>
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={handleMenu}
                    >
                      <MenuIcon />
                    </IconButton>
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
                      <MenuItem onClick={() => navigate("/list/myheroes")}>
                        <GroupsIcon color="secondary" sx={{ mr: 1 }} /> My
                        Heroes
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/list/mygratitudes")}>
                        <VolunteerActivismIcon
                          color="secondary"
                          sx={{ mr: 1 }}
                        />
                        My Testimonies
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/my-profile")}>
                        <AccountCircleIcon color="secondary" sx={{ mr: 1 }} />
                        My account
                      </MenuItem>
                      {user?.user ? (
                        <MenuItem onClick={handleLogout}>
                          <LogoutIcon color="secondary" sx={{ mr: 1 }} />
                          Logout
                        </MenuItem>
                      ) : null}
                    </Menu>
                  </>
                )}
                <MobileMenu />
              </div>
            </GrToolBar>
          </Container>
        </GrAppBar>
      </Box>
    </div>
  );
};
export default Header;
