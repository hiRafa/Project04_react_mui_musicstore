import React from "react";
import classes from "./News.module.css";

const NewsBackdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCancel} />;
};

export default NewsBackdrop;
