import { styled, Typography } from "@mui/material";
import React from "react";

const TypoTitleCSS = styled(Typography)({
  flex: 1,
  padding: ".5rem",
});

const TypoTitleForm = (props) => {
  return <TypoTitleCSS>{props.profilename}</TypoTitleCSS>;
};

export default TypoTitleForm;
