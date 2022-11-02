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
import CartContext from "../context/cart-context";

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

const Navbar = () => {
  // MEnu State
  const { activeMenu, setActiveMenu, screenSize } = useContext(GlobalContexts);
  const { userIsLoggedIn } = useContext(LoginTokenContexts);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  let amountOfItemsInCart = cartItems.reduce((currentNum, cartItem) => {
    return currentNum + cartItem.amount;
  }, 0);

  const cartBadge = (
    <NavLink to="/cart">
      <button className={`${classes.buttonNav} ${classes.buttonNavCart}`}>
        <Badge badgeContent={amountOfItemsInCart}>
          <ShoppingCartIcon />
        </Badge>
      </button>
    </NavLink>
  );

  return (
    <AppBar className={classes.navBar}>
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
          <MenuOpenRoundedIcon sx={{ display: "flex", alignSelf: "center" }} />
        </Typography>

        <NavBarSearch />

        <IconsBarCSSDesktop>
          {cartBadge}
          {userIsLoggedIn ? (
            <ButtonLogout className={classes.buttonNav} />
          ) : (
            <IconsBarCSSDesktop>
              <ButtonSignup className={classes.buttonNav} />
              <ButtonSignin className={classes.buttonNav} />
            </IconsBarCSSDesktop>
          )}
        </IconsBarCSSDesktop>

        <IconsBarCustomMobile>
          {cartBadge}
          {userIsLoggedIn ? (
            <ButtonLogout className={classes.buttonNav} />
          ) : (
            <ButtonSignin buttonTxt="Account" className={classes.buttonNav} />
          )}
        </IconsBarCustomMobile>
      </ToolBarCSS>
    </AppBar>
  );
};

export default Navbar;
