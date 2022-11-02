import React, { Fragment, useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Pages.module.css";
import CartContext from "./context/cart-context";

import BoxPages from "./ui/BoxPages";
import ButtonAll from "./ui/ButtonAll";
import Checkout from "./Cart/Checkout";
import CartItem from "./Cart/CartItem";

import { Box } from "@mui/material";

const CartPage = (props) => {
  const { cartItems, priceTotal, amount, removeItem, addItem } =
    useContext(CartContext);
  // console.log(cartItems);
  // console.log(priceTotal);
  // console.log(amount);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  let cartHasItems;
  if (cartItems) cartHasItems = cartItems.length > 0;

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    if (cartItems) {
      await fetch(
        "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartItems,
          }),
        }
      );
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    // cartContextforCart.clearCart();
  };
  // console.log(cartItems);

  const itemsOnCart = (
    <ul className={classes["cart-itemsList"]}>
      {cartItems &&
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            img={item.img}
            onRemove={cartItemRemoveHandler.bind(null, item)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
    </ul>
    // bind preconfigures a function for future execution preconfiguring the argument when
    // the function is executed, making surein this case that the function will received the id or item
  );

  const actionButtons = (
    <div className={classes.actions}>
      <NavLink to="/">
        <ButtonAll
          className={classes.buttonShop}
          buttonTxt={"Keep Shopping!"}
        />
      </NavLink>
      {cartHasItems && (
        <ButtonAll
          className={classes.buttonOrder}
          onClick={orderHandler}
          buttonTxt={"Order"}
        />
      )}
    </div>
  );

  // Case 1 if it is not submitting and did not submit yet
  const cartContent = (
    <Fragment>
      {itemsOnCart}
      <div className={classes.total}>
        <Box>
          <p>Total Amount:</p>
        </Box>
        <Box>
          <p>{`¥${priceTotal.toFixed(3)} `}</p>
        </Box>
      </div>
      {isCheckout && (
        <Checkout
          onConfirmDataTo={submitOrderHandler}
          onCancel={props.onClose}
        />
      )}
      {!isCheckout && actionButtons}
    </Fragment>
  );

  // Case 2 if it is submitting
  const isSubmittingModalContent = <p>Sending order data...</p>;

  // Case 3 if it is no submitting anymore and it did submit
  const orderSuccessContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <NavLink to="/">
        <ButtonAll buttonTxt="Check out more!" />
      </NavLink>
    </Fragment>
  );
  return (
    <BoxPages>
      {!isSubmitting && !didSubmit && cartContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && orderSuccessContent}
    </BoxPages>
  );
};

export default CartPage;
