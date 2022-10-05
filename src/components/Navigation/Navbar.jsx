import { React, useContext, useEffect } from "react";
import classes from "./Navigation.module.css";

import GlobalContexts from "../context/global-contexts";
import NavBarSearch from "./NavBarSearch";

import { AppBar, Badge, Box, styled, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ButtonSignin from "../Custom/ButtonSignin";
import ButtonSignup from "../Custom/ButtonSignup";
import LoginTokenContexts from "../context/login-token-context";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import ButtonLogout from "../Custom/ButtonLogout";
import { NavLink } from "react-router-dom";

// ------ CSS

const ToolBarCSS = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
});

const IconsBarCSSDesktop = styled(Box)(({ theme }) => ({
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

// -------- Component

const Navbar = ({ theme }) => {
  // MEnu State
  const { activeMenu, setActiveMenu, screenSize } = useContext(GlobalContexts);

  const { userIsLoggedIn } = useContext(LoginTokenContexts);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const cartBadge = (
    <NavLink to="/cart">
      <Badge badgeContent={2} sx={{ color: "var(--color-white)" }}>
        <ShoppingCartIcon />
      </Badge>
    </NavLink>
  );

  return (
    <AppBar position="fixed">
      <ToolBarCSS>
        <Typography
          variant="h6"
          className={classes.hideOnMobile}
          onClick={handleActiveMenu}
          sx={{ cursor: "pointer" }}
        >
          Menu
        </Typography>
        <Typography
          variant="h6"
          className={classes.showOnMobile}
          onClick={handleActiveMenu}
          sx={{ cursor: "pointer" }}
        >
          <MenuOpenRoundedIcon />
        </Typography>

        <NavBarSearch />

        <IconsBarCSSDesktop>
          {cartBadge}
          {userIsLoggedIn ? (
            <ButtonLogout />
          ) : (
            <IconsBarCSSDesktop>
              <ButtonSignup />
              <ButtonSignin />
            </IconsBarCSSDesktop>
          )}
        </IconsBarCSSDesktop>

        <IconsBarCustomMobile>
          {cartBadge}
          {userIsLoggedIn ? (
            <ButtonLogout />
          ) : (
            <ButtonSignin buttonTxt="Account" />
          )}
        </IconsBarCustomMobile>
      </ToolBarCSS>
    </AppBar>
  );
};

export default Navbar;
