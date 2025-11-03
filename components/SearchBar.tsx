import React from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
  isIncognito: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch, isIncognito }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-slate-400" />
      </div>
      <input
        type="search"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={isIncognito ? "Incognito Search..." : "Search with .onion support..."}
        className="w-full p-4 pl-12 text-lg bg-slate-800 border border-slate-700 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
        autoFocus
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-300 hover:text-purple-400 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
