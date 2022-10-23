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

  const submitSearch = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = event.target.searcher.value;
    setSearchValue(value);
  };

  return (
    <form onSubmit={submitSearch}>
      <input
        className="searchInput"
        type="text"
        name="searcher"
        placeholder={placeholder}
      />
    </form>
  );
};

export default Search;
