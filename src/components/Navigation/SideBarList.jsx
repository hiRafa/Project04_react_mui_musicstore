import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import SideBarItem from "./SideBarItem";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Switch,
} from "@mui/material";

import DraftsIcon from "@mui/icons-material/Drafts";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/Inbox";
import SegmentIcon from "@mui/icons-material/Segment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GlobalContexts from "../context/global-contexts";

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
  {
    menuItemID: 4,
    menuItemNav: "/shops",
    menuItemTxt: "Shops",
    icon: <LocationOnIcon />,
  },
];

const SideBarList = (props) => {
  const { navMenuSelectedIndex, setNavMenuSelectedIndex, handleNavItemClick } =
    useContext(GlobalContexts);
  // const handleListItemClick = (event, index) => {
  //   setNavMenuSelectedIndex(index);
  // };

  const eachItem = menuItems.map((item) => (
    <NavLink to={`${item.menuItemNav}`} key={item.menuItemID}>
      <ListItemButton
        selected={navMenuSelectedIndex === `${item.menuItemID}`}
        onClick={(event) => handleNavItemClick(event, `${item.menuItemID}`)}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={`${item.menuItemTxt}`} />
      </ListItemButton>
    </NavLink>
  ));

  return (
    <List component="nav" aria-label="main mailbox folders">
      {eachItem}
      {/* {menuItems.map((item) => (
        <SideBarItem
          menuItemNav={item.menuItemNav}
          menuItemID={item.menuItemID}
          menuItemTxt={item.menuItemTxt}
          key={item.menuItemID}
          // selectedIndexProps={selectedIndex}
          // functionF={handleListItemClick} 
          // failed, couldnt pass the function and the state through props
        />
      ))} */}

      <ListItemButton
        selected={navMenuSelectedIndex === 10}
        onClick={(event) => handleNavItemClick(event, 10)}
      >
        <ListItemIcon>
          <NightsStayIcon />
        </ListItemIcon>

        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Dark Mode"
        />
      </ListItemButton>
    </List>
  );
};

export default SideBarList;
