import { createContext, ReactNode, useState } from "react";

interface Inclination {
  inclination: number | undefined;
  setInclination: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const inclinationContext = createContext<Inclination>({
  inclination: undefined,
  setInclination: () => {},
});

export const InclinationProvider = ({ children }: { children: ReactNode }) => {
  const [inclination, setInclination] = useState<number | undefined>();
  const value = { inclination, setInclination };
  return (
    <inclinationContext.Provider value={value}>
      {children}
    </inclinationContext.Provider>
  );
};
