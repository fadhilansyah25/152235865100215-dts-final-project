import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Menu,
  Tooltip,
  MenuItem,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/img/logo.svg";
import useScrollPosition from "../hooks/useScrollPosition";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { logOut, auth } from "../firebase/firebase";

const pages = [
  { title: "Home", nav: "/" },
  { title: "Cryptocurrencies", nav: "/cryptocurrencies" },
  { title: "Exchange", nav: "/exchange" },
  { title: "News", nav: "/news" },
  { title: "Watchlist", nav: "/watchlist" },
];
const settings = [
  { title: "Profile", nav: "/profile" },
  { title: "Account", nav: "/account" },
  { title: "Dashboard", nav: "/dashboard" },
  { title: "Logout", logOut: true },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#141414",
  border: "2px solid #18C8FF",
  boxShadow: 24,
  p: 4,
  color: "white",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
};

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, loading] = useAuthState(auth);
  const scrollPositon = useScrollPosition();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "none",
        backdropFilter: `${scrollPositon > 90 ? "blur(15px)" : "blur(2px)"}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              textDecoration: "none",
            }}
            src={Logo}
          />

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={() => navigate(page.nav)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <Box component="img" src={Logo} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => navigate(page.nav)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  textTransform: "capitalize",
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {loading ? null : user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Typography
                sx={{
                  display: { md: "inline", xs: "none" },
                  mr: 1,
                  fontSize: "0.9rem",
                }}
              >
                {user.displayName.split(" ")[0]}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="avatar name" src="">
                    {user.displayName.slice(0, 1)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    onClick={
                      setting.logOut
                        ? () => {
                            handleOpen();
                            handleCloseUserMenu();
                          }
                        : () => {
                            navigate(`${setting.nav}/${user.uid}`);
                          }
                    }
                  >
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              color="error"
              variant="contained"
              sx={{
                textTransform: "none",
                px: 5,
                background:
                  "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
                transition: "background 0.7s",
                "&:hover": {
                  background: "#933FFE",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mb: 5 }}>
            Are you sure want to Quit?
          </Typography>
          <Button
            color="primary"
            variant="contained"
            sx={{
              textTransform: "none",
              px: 5,
              backgroundColor: "#18C8FF",
              color: "white",
            }}
            onClick={() => {
              handleClose();
              logOut();
            }}
          >
            Yeah, Im Sure
          </Button>
        </Box>
      </Modal>
    </AppBar>
  );
}
