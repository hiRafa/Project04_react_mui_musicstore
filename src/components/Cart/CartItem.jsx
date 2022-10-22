import classes from "./Cart.module.css";

const CartItem = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <div className={classes["cart-item_img"]}>
        <img src={props.img} />
      </div>
      <div className={classes["cart-item_body"]}>
        <h2>{props.name}</h2>
        <div className={classes.PriceAmount}>
          <span className={classes.price}>{`¥${props.price.toFixed(3)}`}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes["cart-item_buttons"]}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
