import React, { Fragment } from "react";
import classes from "./ui.module.css";

import { Box } from "@mui/material";
const BoxPages = (props) => {
  return (
    <Fragment>
      <Box className={`${classes.boxPages} ${props.className}`}>{props.children}</Box>
    </Fragment>
  );
};
export default BoxPages;
