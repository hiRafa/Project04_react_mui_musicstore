import { createContext, useReducer } from "react";

// just to make it easier to call the functions, but not necessary
// const CartContext = createContext({
//   cartItems: [],
//   priceTotal: 0,
//   addItem: (cartItems) => {},
//   removeItem: (id) => {},
// });
const CartContext = createContext();

const defaultCartState = {
  cartItems: [],
  priceTotal: 0,
  amount: 0,
};

const CartReducer = (lastState, cartAction) => {
  if (cartAction.type === "ADD") {
    // Calculating the total price when adding an item to the array of cartItems
    const updatedPriceTotal =
      lastState.priceTotal +
      cartAction.product.price * cartAction.product.amount;

    // Getting the Index for each product in the array of cartItems
    const existingCartItemIndex = lastState.cartItems.findIndex(
      (item) => item.id === cartAction.product.id
    );
    const existingCartItem = lastState.cartItems[existingCartItemIndex];

    let updatedItems;
    // if the product exists in the cart
    if (existingCartItem) {
      // then spread the product and increase the amount
      const updatedItemsAmount = {
        ...existingCartItem,
        amount: existingCartItem.amount + cartAction.product.amount,
      };

      // the helper array is equal to the last state of the cartItems array
      updatedItems = [...lastState.cartItems];
      // and the existing item is the same item with a new amount increased
      updatedItems[existingCartItemIndex] = updatedItemsAmount;
    } else {
      updatedItems = lastState.cartItems.concat(cartAction.product);
    }
    // console.log(updatedItems);
    // console.log(updatedPriceTotal);

    return {
      cartItems: updatedItems,
      priceTotal: updatedPriceTotal,
    };
  }

  if (cartAction.type === "REMOVE") {
    console.log(cartAction.product.id);
    // Getting the Index for each product in the array of cartItems
    const existingCartItemIndex = lastState.cartItems.findIndex(
      (item) => item.id === cartAction.product.id
    );
    const existingCartItem = lastState.cartItems[existingCartItemIndex];

    // Calculating the total price when removing an item from the array of cartItems
    let updatedPriceTotal;
    if (existingCartItem)
      updatedPriceTotal = lastState.priceTotal - existingCartItem.price;

    // array helper , first if to check if there is one item only in the cartItems (cart) for each product
    // if it is, then it will be removed when clicking on the remove button, because there is only one.
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = lastState.cartItems.filter(
        (item) => item.id !== cartAction.product.id
      );
    } else {
      // for more than 2 items per product:
      // the existing product in the cart is equal to the existing product and the amount minus 1
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      // the array helper is equal to the last cartItems state (array of cartItems)
      updatedItems = [...lastState.cartItems];
      // and the product that had an amount removed it equal to the equation above
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // console.log(updatedItems);
    // console.log(updatedPriceTotal);
    return {
      cartItems: updatedItems,
      priceTotal: updatedPriceTotal,
    };
  }

  return defaultCartState;
};

export function CartContextProvider(props) {
  // Use Reducer,  first arg is to point to the Reducer Function (React will execute it accordingly)
  // second arg is the initial state
  const [currentCartState, dispatchCartAction] = useReducer(
    CartReducer,
    defaultCartState
  );

  const addItem = (item) => {
    // Dispatching an action can be a number or a text, but it is usually an object
    dispatchCartAction({ type: "ADD", product: item });
    // console.log(cartItems);
  };

  const removeItem = (id) => {
    dispatchCartAction({ type: "REMOVE", product: id });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: currentCartState.cartItems,
        priceTotal: currentCartState.priceTotal,
        amount: currentCartState.amount,
        addItem,
        removeItem,
        CartReducer,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
