import { Box, Typography } from "@mui/material";
import React from "react";

const BoxProfileInfo = (props) => {
  return (
    <Box>
      <Typography variant="h2">{props.txt}</Typography>
    </Box>
  );
};

export default BoxProfileInfo;
