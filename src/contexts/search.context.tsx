import { createContext, ReactNode, useState } from "react";

type SearchContext = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};
// creating the actual context with default value
export const searchContext = createContext<SearchContext>({
  searchValue: "default",
  setSearchValue: () => "default",
});

type Props = {
  children?: ReactNode;
  // any props that come into the component
};

export const SearchProvider = ({ children }: Props) => {
  const [searchValue, setSearchValue] = useState("no search value");
  const value = { searchValue, setSearchValue };

  return (
    <searchContext.Provider value={value}>{children}</searchContext.Provider>
  );
};
