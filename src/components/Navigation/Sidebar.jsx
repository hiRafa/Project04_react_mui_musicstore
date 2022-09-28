import React from "react";
import { Box } from "@mui/material";
import SideBarList from "./SideBarList";

const Sidebar = (props) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: "2px 0px 5px #888888",
        paddingTop: 8,
        position: "fixed",
      }}
    >
      <SideBarList />
    </Box>
  );
};

export default Sidebar;
