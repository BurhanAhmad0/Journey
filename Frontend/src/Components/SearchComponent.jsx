import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchComponent = ({ query, setQuery, setSearches, searches }) => {
  const navigate = useNavigate();

  const handleSearchNavigate = (search) => {
    navigate(`/${search?.username}`);
    setSearches(null);
    setQuery("");
  };

  return (
    <form className="relative">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <Search
        className="absolute left-2 top-1/2 -translate-y-1/2 text-black"
        size={20}
      />

      <input
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        id="search"
        name="search"
        type="search"
        value={query}
        placeholder="Search"
        className="pl-8 pr-2 py-1 bg-gray-300 border-[2px] border-black rounded-md outline-none"
      />

      {searches && searches.length > 0 && (
        <ul className="space-y-2 p-3 absolute right-0 top-12.5 w-60 rounded-md bg-black">
          {searches.map((search, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => handleSearchNavigate(search)}
                className="flex items-center gap-3 p-2 w-full text-start cursor-pointer hover:bg-white/15 rounded-md border-b border-gray-700 pt-2 pb-2 text-white transition-all duration-300"
              >
                <img
                  className="w-9 h-9 rounded-full border-[2px] border-gray-500"
                  src={search?.avatar}
                  alt="Profile Image"
                />
                {search?.firstName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchComponent;
