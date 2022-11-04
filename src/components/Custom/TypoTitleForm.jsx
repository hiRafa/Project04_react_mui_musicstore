import { styled, Typography } from "@mui/material";
import React from "react";

const TypoTitleCSS = styled(Typography)({
  flex: 1,
  padding: ".5rem .5rem .5rem 0",
  width: "40px",
});

const TypoTitleForm = (props) => {
  return <TypoTitleCSS>{props.profilename}</TypoTitleCSS>;
};

export default TypoTitleForm;
