import { Button } from "@mui/material";
import React, { useContext } from "react";
import GlobalContexts from "../context/global-contexts";

const ButtonClose = (props) => {
  const { closeModalHandler } = useContext(GlobalContexts);

  return (
    <Button className="btn" onClick={closeModalHandler}>
      {props.txt}
    </Button>
  );
};

export default ButtonClose;
