import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import GlobalContexts from "../context/global-contexts";

import { Box } from "@mui/material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/Inbox";
import SegmentIcon from "@mui/icons-material/Segment";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const menuItems = [
  {
    menuItemID: 0,
    menuItemNav: "/",
    menuItemTxt: "Products",
    icon: <InboxIcon />,
  },
  {
    menuItemID: 1,
    menuItemNav: "/profile",
    menuItemTxt: "Profile",
    icon: <AccountCircleIcon />,
  },
  {
    menuItemID: 2,
    menuItemNav: "/favorites",
    menuItemTxt: "Favorites",
    icon: <FavoriteIcon />,
  },
  {
    menuItemID: 3,
    menuItemNav: "/articles",
    menuItemTxt: "Articles",
    icon: <SegmentIcon />,
  },
  // {
  //   menuItemID: 4,
  //   menuItemNav: "/shops",
  //   menuItemTxt: "Shops",
  //   icon: <LocationOnIcon />,
  // },
];

const Sidebar = () => {
  const {
    navMenuSelectedIndex,
    setNavMenuSelectedIndex,
    activeMenu,
    setActiveMenu,
  } = useContext(GlobalContexts);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const handleListItemClick = (event, index) => {
    setNavMenuSelectedIndex(index);
    handleActiveMenu();
  };

  const eachItem = menuItems.map((item) => (
    <NavLink
      to={`${item.menuItemNav}`}
      key={item.menuItemID}
      className="navLink"
    >
      <ListItemButton
        selected={navMenuSelectedIndex === `${item.menuItemID}`}
        onClick={(event) => handleListItemClick(event, `${item.menuItemID}`)}
      >
        <ListItemIcon sx={{ color: "var(--color-seconday-light)" }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={`${item.menuItemTxt}`}
          sx={{ color: "var(--color-seconday-light)" }}
        />
      </ListItemButton>
    </NavLink>
  ));

  return (
    <Box
      sx={{
        bgcolor: "var(--color-primary-dark)",
        color: "var(--color-white)",
        boxShadow: "2px 0px 5px #888888",
        paddingTop: 8,
      }}
      className={classes.navSide}
    >
      <List component="nav" aria-label="main mailbox folders">
        {eachItem}
      </List>
    </Box>
  );
};

export default Sidebar;
