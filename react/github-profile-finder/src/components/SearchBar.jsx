function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search a GitHub username..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
    />
  );
}

export default SearchBar;
