import { Button, styled } from "@mui/material";
import React, { useContext } from "react";
import GlobalContexts from "../context/global-contexts";

const ButtonCSS = styled(Button)({
  padding: ".5rem",
  fontSize: "1.25rem",
});

const ButtonClose = (props) => {
  const { closeModalHandler } = useContext(GlobalContexts);

  return <ButtonCSS onClick={closeModalHandler}>{props.txt}</ButtonCSS>;
};

export default ButtonClose;
