import React, { createContext, useState } from "react";

export const Store = createContext(null);
const NavBarContext = ({children}) => {
  const [open, setOpen] = useState(true);
  return <Store.Provider value={{ open, setOpen }}>{children}</Store.Provider>;
};

export default NavBarContext;
