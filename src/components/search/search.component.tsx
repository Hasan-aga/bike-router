import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useContext,
  useState,
} from "react";
import { searchContext } from "../../contexts/search.context";
import "./search.style.scss";

type searchProps = {
  placeholder: string;
};

const Search = ({ placeholder }: searchProps) => {
  const { searchValue, setSearchValue } = useContext(searchContext);

  const submitSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  return (
    <input
      className="searchInput"
      type="text"
      placeholder={placeholder}
      onChange={submitSearch}
    />
  );
};

export default Search;
