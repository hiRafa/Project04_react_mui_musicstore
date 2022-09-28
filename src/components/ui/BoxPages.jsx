import { Box } from "@mui/material";
import React from "react";
import { Fragment } from "react";

const BoxPages = (props) => {
  return (
    <Fragment>
      <Box
        bgcolor={"pink"}
        p={2}
        paddingTop={8}
        sx={{ height: "100%", width: "100vw" }}
      >
        {props.children}
      </Box>
    </Fragment>
  );
};
export default BoxPages;
