import { Box } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import classes from "./ui.module.css";

const BoxPages = (props) => {
  return (
    <Fragment>
      <Box className={classes.boxPages}>{props.children}</Box>
    </Fragment>
  );
};
export default BoxPages;
