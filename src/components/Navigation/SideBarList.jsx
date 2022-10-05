import React, { useContext } from "react";
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

  // const itemDarkMode = (
  //   <ListItemButton
  //     selected={navMenuSelectedIndex === 10}
  //     onClick={(event) => handleNavItemClick(event, 10)}
  //   >
  //     <ListItemIcon>
  //       <NightsStayIcon sx={{ color: "var(--color-seconday-light)" }} />
  //     </ListItemIcon>

  //     <FormControlLabel control={<Switch defaultChecked />} label="Dark Mode" />
  //   </ListItemButton>
  // );
  return (
    <List component="nav" aria-label="main mailbox folders">
      {eachItem}
    </List>
  );
};

export default SideBarList;
