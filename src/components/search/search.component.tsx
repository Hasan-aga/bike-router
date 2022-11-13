import { ChangeEvent, useContext } from "react";
import { searchContext } from "../../contexts/search.context";
import "./search.style.scss";
import { FaSearchLocation } from "react-icons/fa";
import { IconType } from "react-icons";
type searchProps = {
  placeholder: string;
  SearchIcon?: IconType;
};

const Search = ({ placeholder, SearchIcon }: searchProps) => {
  const { setSearchValue } = useContext(searchContext);

  const submitSearch = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = event.target.searcher.value;
    setSearchValue(value);
  };

  return (
    <form onSubmit={submitSearch}>
      <div className="search-group">
        <input
          className="searchInput"
          type="text"
          name="searcher"
          placeholder={placeholder}
        />
        <button type="submit">
          {SearchIcon ? <SearchIcon /> : <FaSearchLocation />}
        </button>
      </div>
    </form>
  );
};

export default Search;
