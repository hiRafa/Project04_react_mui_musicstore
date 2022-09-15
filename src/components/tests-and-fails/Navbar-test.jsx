import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
// import React, { useContext } from "react";
// import globalCSSContext from "./globalCSS-context";
import AdbIcon from "@mui/icons-material/Adb";
import classes from "./general.module.css";
import { Mail, Notifications, PersonAdd } from "@mui/icons-material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchCustom = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 1rem",
  borderRadius: theme.shape.borderRadius,
  width: "30%",
}));

const NavbarTest = () => {
  // const globalCSSCtxt = useContext(globalCSSContext);
  // const displayOnMobile = globalCSSCtxt.displayOnMobile;
  // const hideOnMobile = globalCSSCtxt.hideOnMobile;
  // svg files and icons are different for overiding  css

  return (
    <AppBar position="sticky">
      <StyledToolBar>
        {/* using context also did not work, maybe not considered inline? */}
        {/* <Typography variant="h6" sx={{ hideOnMobile }}> */}
        <Typography variant="h6" className={classes.hideOnMobile}>
          Navbar
        </Typography>
        {/* className="displayOnMobile" is being overwritten by inline class to show */}
        {/* <AdbIcon className={classes.showOnMobile} /> */}
        {/* using context also did not work, maybe not considered inline? */}
        {/* <AdbIcon sx={{ displayOnMobile }} /> */}
        <AdbIcon sx={{ display: { xs: "block", sm: "none" } }} />

        <SearchCustom>
          <InputBase placeholder="Search..."></InputBase>
        </SearchCustom>

        <IconsBarCustom>
          <Badge badgeContent={4} color="primary">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="primary">
            <MusicNoteIcon />
          </Badge>
          <Avatar src="" sx={{ width: 30, height: 30 }} />
        </IconsBarCustom>

        <IconsBarCustomMobile>
          <Avatar src="" sx={{ width: 30, height: 30 }} />
        </IconsBarCustomMobile>
      </StyledToolBar>
    </AppBar>
  );
};

export default NavbarTest;
