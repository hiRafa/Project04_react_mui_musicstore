import React, { useRef, useState, useContext } from "react";
import classes from "./Custom.module.css";

import { styled } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import ButtonCartInput from "./ButtonCartInput";

import CartContext from "../context/cart-context";

const AddShoppingCartRoundedIconCSS = styled(AddShoppingCartRoundedIcon)({
  fontSize: "1.5rem",
  fill: "var(--color-white)",
  ":hover": {
    fontSize: "2rem",
    fill: `var(--color-seconday-main)`,
    transition: "all 0.25s linear",
  },
});

const ButtonCartAdd = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const { addItem } = useContext(CartContext);
  const productAmountRef = useRef(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = productAmountRef.current.value;
    const enteredAmountTotal = +enteredAmount;

    // checking amount validity before passing through props
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountTotal < 1 ||
      enteredAmountTotal > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      img: props.img,
      amount: enteredAmountTotal,
    });

    console.log(enteredAmountTotal);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <ButtonCartInput
        ref={productAmountRef}
        // label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />

      <button className={classes.cartAdd}>
        <AddShoppingCartRoundedIconCSS />
      </button>
      {!amountIsValid && <p>Please enter amount 1-5!</p>}
    </form>
  );
};

export default ButtonCartAdd;
