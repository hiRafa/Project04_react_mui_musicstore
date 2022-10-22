import React from "react";

import classes from "./Custom.module.css";

const ButtonCartInput = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
    // {...props.input}  to spread all of the forms specifications like "type: number, text...." and others
  );
});

export default ButtonCartInput;
