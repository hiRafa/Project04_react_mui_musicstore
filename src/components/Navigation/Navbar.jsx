import { React, useContext, useEffect } from "react";
import classes from "./general.module.css";

import GlobalContexts from "../context/global-contexts";
import NavBarSearch from "./NavBarSearch";
import NavBarMenuRight from "./NavBarMenuRight";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ButtonSignin from "../Buttons/ButtonSignin";
import ButtonSignup from "../Buttons/ButtonSignup";
import LoginTokenContexts from "../context/login-token-context";

const ToolBarCSS = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
});

const IconsBarCustomDesktop = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "1rem",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  cursor: "pointer",
}));

const IconsBarCustomMobile = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const Navbar = ({ theme }) => {
  // MEnu State
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    setNavMenuRightOpen,
  } = useContext(GlobalContexts);

  const { userIsLoggedIn } = useContext(LoginTokenContexts);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const cartBadge = (
    <Badge badgeContent={2} color="primary">
      <ShoppingCartIcon />
    </Badge>
  );

  return (
    <AppBar position="sticky">
      <ToolBarCSS>
        <Typography
          variant="h6"
          className={classes.hideOnMobile}
          onClick={handleActiveMenu}
          sx={{ cursor: "pointer" }}
        >
          Menu
        </Typography>

        <MenuOpenIcon
          sx={{ display: { xs: "block", sm: "none" } }}
          onClick={handleActiveMenu}
        />

        <NavBarSearch></NavBarSearch>
        <IconsBarCustomDesktop>
          {cartBadge}
          {userIsLoggedIn ? (
            <IconsBarCustomDesktop>
              <Typography>Welcome</Typography>
              <Avatar
                src=""
                sx={{ width: 30, height: 30 }}
                onClick={(e) => setNavMenuRightOpen(true)}
              />
            </IconsBarCustomDesktop>
          ) : (
            <IconsBarCustomDesktop>
              <ButtonSignup />
              <ButtonSignin />
            </IconsBarCustomDesktop>
          )}
        </IconsBarCustomDesktop>

        <IconsBarCustomMobile onClick={(e) => setNavMenuRightOpen(true)}>
          {cartBadge}
          <Avatar src="" sx={{ width: 30, height: 30 }} />
        </IconsBarCustomMobile>

        <NavBarMenuRight />
      </ToolBarCSS>
    </AppBar>
  );
};

export default Navbar;
