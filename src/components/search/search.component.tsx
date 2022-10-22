import "./search.style.scss";

type searchProps = {
  placeholder: string;
};

const Search = ({ placeholder }: searchProps) => {
  return (
    <input className="searchInput" type="text" placeholder={placeholder} />
  );
};

export default Search;
