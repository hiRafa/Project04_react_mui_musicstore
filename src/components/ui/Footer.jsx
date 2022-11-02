import { Box } from "@mui/material";
import React from "react";
import classes from "./ui.module.css";

const Footer = () => {
  return (
    <Box className={classes.footer}>
      <p>React webapp created by Rafael Hirashiki</p>
      <p>
        Users can create profiles for shopping online instruments. The company
        publishes articles to promote their products.
      </p>
    </Box>
  );
};

export default Footer;
