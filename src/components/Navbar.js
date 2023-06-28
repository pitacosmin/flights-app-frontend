import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Stack,
  Divider,
  Avatar,
  Menu,
  Tooltip,
  IconButton,
  MenuItem,
} from "@mui/material";
import Home from "../pages/Home/Home";
import RoutesMap from "../pages/RoutesMap/RoutesMap";
import SignUp from "../pages/SignUp/SignUp";
import LogIn from "../pages/LogIn/LogIn";
import SelectFlight from "../pages/SelectFlight/SelectFlight";
// import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import MapIcon from "../assets/map.png";
import WorldIcon from "../assets/world.png";
import "../assets/styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/features/userSlice";
import PersistLogin from "../pages/LogIn/PersistLogin";
import SuccessPage from "./SuccessPage";
import BookingHistory from "../pages/BookingHistory/BookingHistory";

function ResponsiveAppBar() {
  // const [anchorElNav, setAnchorElNav] = useState(null);
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };
  const user = useSelector(selectUser);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsUserAuthenticated(true);
    }
  }, [user]);

  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

  const [openLogIn, setOpenLogIn] = useState(false);
  const handleOpenLogIn = () => setOpenLogIn(true);
  const handleCloseLogIn = () => setOpenLogIn(false);

  const handleLogInToSignUp = () => {
    setOpenLogIn(false);
    setOpenSignUp(true);
  };

  const handleSignUpToLogIn = () => {
    setOpenLogIn(true);
    setOpenSignUp(false);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    setAnchorElUser(null);
    setIsUserAuthenticated(false);
    dispatch(logout());
  };

  const handleGoToBookings = () => {
    if (!user?.isAuthenticated) {
      handleOpenLogIn(true);
    }
  };

  return (
    <BrowserRouter>
      <AppBar className="navbar" sx={{ position: "static" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={WorldIcon}
                    alt="World Icon"
                    style={{
                      maxHeight: "50px",
                      maxWidth: "50px",
                      marginRight: "5px",
                    }}
                  />
                  <span>Home</span>
                </div>
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Home
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              <Stack
                direction="row"
                divider={
                  <Divider
                    style={{ background: "white" }}
                    orientation="vertical"
                    flexItem
                  />
                }
                spacing={2}
              >
                {isUserAuthenticated ? (
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/booking-history"
                    >
                      Booking history
                    </Link>
                  </Button>
                ) : (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={handleGoToBookings}
                  >
                    Booking History
                  </Button>
                )}
                {isUserAuthenticated ? (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>{user?.email}</Typography>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={user?.email} />
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
                      <MenuItem onClick={handleLogOut}>
                        <Typography textAlign="center">Log out</Typography>
                      </MenuItem>
                    </Menu>
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={2}
                    divider={
                      <Divider
                        style={{ background: "white" }}
                        orientation="vertical"
                        flexItem
                      />
                    }
                  >
                    <Button
                      onClick={handleOpenSignUp}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Sign up
                    </Button>
                    <Button
                      onClick={handleOpenLogIn}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Log in
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <SignUp
        open={openSignUp}
        handleClose={handleCloseSignUp}
        handleSwitch={handleSignUpToLogIn}
      ></SignUp>
      <LogIn
        open={openLogIn}
        handleClose={handleCloseLogIn}
        handleSwitch={handleLogInToSignUp}
      ></LogIn>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route exact path="" element={<Home />} />
          <Route path="booking-history" element={<BookingHistory />} />
          <Route path="select-flights" element={<SelectFlight />} />
          <Route path="payment-success" element={<SuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default ResponsiveAppBar;
