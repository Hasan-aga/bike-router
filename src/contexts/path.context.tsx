import { createContext, ReactNode, useState } from "react";
import { Route } from "../utils/routeTypes";

interface Path {
  path: Route | undefined;
  setPath: React.Dispatch<React.SetStateAction<Route | undefined>>;
}

export const pathContext = createContext<Path>({
  setPath: () => {},
  path: undefined,
});
type Props = {
  children?: ReactNode;
};

export const PathProvider = ({ children }: Props) => {
  const [path, setPath] = useState<Route | undefined>();
  const value = { path, setPath };

  return <pathContext.Provider value={value}>{children}</pathContext.Provider>;
};
