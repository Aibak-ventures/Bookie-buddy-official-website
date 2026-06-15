import { useState, useRef, useEffect } from 'react';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/**
 * SearchBar — debounced search input that calls onChange after 400ms pause.
 */
const SearchBar = ({ initialValue = '', onSearch }) => {
  const [value, setValue] = useState(initialValue);
  const timerRef = useRef(null);

  // Sync if parent changes initialValue (e.g. clear filters)
  useEffect(() => { setValue(initialValue); }, [initialValue]);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch(v.trim()), 400);
  };

  const handleClear = () => {
    setValue('');
    clearTimeout(timerRef.current);
    onSearch('');
  };

  return (
    <div className="results-search-bar">
      <span className="results-search-icon"><SearchIcon /></span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search products…"
        className="results-search-input"
      />
      {value && (
        <button type="button" className="results-search-clear" onClick={handleClear} aria-label="Clear search">
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
