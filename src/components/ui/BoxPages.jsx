import { Box } from "@mui/material";
import React from "react";

const BoxPages = (props) => {
  return (
    <Box flex={4} bgcolor={"pink"} p={2} sx={{ height: "100%" }}>
      {props.children}
    </Box>
  );
};
export default BoxPages;
