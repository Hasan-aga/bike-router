import { createContext, ReactNode, useState } from "react";
import { Route } from "../utils/routeTypes";

export const pathContext = createContext({});
type Props = {
  children?: ReactNode;
};

export const PathProvider = ({ children }: Props) => {
  const [path, setPath] = useState();
  const value = { path, setPath };

  return <pathContext.Provider value={value}>{children}</pathContext.Provider>;
};
