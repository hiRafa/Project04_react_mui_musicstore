import React from "react";
import classes from "./ui.module.css";

const Section = (props) => {
  return (
    <section className={`${classes.section} ${props.className}`}>
      {props.children}
    </section>
  );
};

export default Section;
