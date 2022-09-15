import React from "react";
import { Box } from "@mui/material";
import SideBarList from "./SideBarList";
import ButtonSignin from "../Buttons/ButtonSignin";

const Sidebar = (props) => {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: "background.paper",
        boxShadow: "2px 0px 5px #888888",
      }}
    >
      <SideBarList />
    </Box>
  );
};

export default Sidebar;
