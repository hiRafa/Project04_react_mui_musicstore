import React, { createContext } from "react";

// Using context for inline css did not work to override the css programmed by the system
// if not using with MUI, it probably works, but then css modules would be better

const globalCSSContext = createContext({
  displayOnMobile: "",
  hideOnMobile: "",
});

export function GlobalCSSContextProvider(props) {
  const display = 'display: { xs: "block", sm: "none" }';
  const hide = 'display: { xs: "none", sm: "block" }';

  const context = {
    displayOnMobile: display,
    hideOnMobile: hide,
  };

  return (
    <globalCSSContext.Provider value={context}>
      {props.children}
    </globalCSSContext.Provider>
  );
}
export default globalCSSContext;
