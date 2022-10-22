import React, { Fragment, useContext, useState } from "react";
import CartContext from "./context/cart-context";
import BoxPages from "./ui/BoxPages";
import classes from "./Signup.module.css";
import Checkout from "./Cart/Checkout";
import CartItem from "./Cart/CartItem";
import ButtonAll from "./ui/ButtonAll";
import { NavLink } from "react-router-dom";

const CartPage = (props) => {
  const { cartItems, priceTotal, amount, removeItem, addItem } =
    useContext(CartContext);
  console.log(cartItems);
  console.log(priceTotal);
  console.log(amount);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  let cartHasItems;
  if (cartItems) cartHasItems = cartItems.length > 0;

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    if (cartItems) {
      await fetch("https://react-http-6b4a6.firebaseio.com/orders.json", {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartItems,
        }),
      });
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    // cartContextforCart.clearCart();
  };

  const itemsOnCart = (
    <ul className={classes["cart-items"]}>
      {cartItems &&
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
    </ul>
    // bind preconfigures a function for future execution preconfiguring the argument when
    // the function is executed, making surein this case that the function will received the id or item
  );

  const modalActions = (
    <div className={classes.actions}>
      <ButtonAll
        className={classes["button-alt"]}
        onClick={props.onCloseCart}
        buttonTxt={"Keep Shopping!"}
      />
      {cartHasItems && (
        <ButtonAll
          className={classes.button}
          onClick={orderHandler}
          buttonTxt={"Order"}
        />
      )}
    </div>
  );

  const cartContent = (
    <Fragment>
      {itemsOnCart}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{priceTotal}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

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
