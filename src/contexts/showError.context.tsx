import { createContext, Dispatch, ReactNode, useState } from "react";

export const showErrorContext = createContext<{
  errorMessage: string | undefined;
  setErrorMessage: Dispatch<React.SetStateAction<string | undefined>>;
}>({
  errorMessage: "",
  setErrorMessage: () => {},
});

export const ShowErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const value = { errorMessage, setErrorMessage };
  return (
    <showErrorContext.Provider value={value}>
      {children}
    </showErrorContext.Provider>
  );
};
