// const GridIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
//     <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
//   </svg>
// );

// const ListIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
//     <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
//     <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
//   </svg>
// );

// const FilterIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
//   </svg>
// );

// /**
//  * ResultsHeader — count summary + mobile view toggle + mobile filter toggle.
//  */
// const ResultsHeader = ({ count, viewMode, onViewChange, filtersOpen, onFiltersToggle }) => {
//   return (
//     <div className="results-header">
//       <p className="results-header__count">
//         {count > 0 ? `${count} product${count !== 1 ? 's' : ''} found` : 'No products found'}
//       </p>

//       <div className="results-header__actions">
//         {/* Mobile filter toggle */}
//         <button
//           type="button"
//           className={`results-header__filter-btn${filtersOpen ? ' results-header__filter-btn--active' : ''}`}
//           onClick={onFiltersToggle}
//           aria-label="Toggle filters"
//         >
//           <FilterIcon /> Filters
//         </button>

//         {/* Mobile view toggle — grid/list */}
//         <div className="results-header__view-toggle">
//           <button
//             type="button"
//             className={`view-toggle-btn${viewMode === 'grid' ? ' view-toggle-btn--active' : ''}`}
//             onClick={() => onViewChange('grid')}
//             aria-label="Grid view"
//             title="Grid view"
//           >
//             <GridIcon />
//           </button>
//           <button
//             type="button"
//             className={`view-toggle-btn${viewMode === 'list' ? ' view-toggle-btn--active' : ''}`}
//             onClick={() => onViewChange('list')}
//             aria-label="List view"
//             title="List view"
//           >
//             <ListIcon />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsHeader;


import { useState, useRef, useEffect } from 'react';

// Icons
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3" />
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ResultsHeader = ({ count, viewMode, onViewChange, filtersOpen, onFiltersToggle, onSearch, initialSearch = '' }) => {
  const [searchActive, setSearchActive] = useState(!!initialSearch);
  const [searchValue,  setSearchValue]  = useState(initialSearch);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch(val.trim()), 400);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  const toggleSearch = () => {
    setSearchActive(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    if (!searchActive && inputRef.current) {
      inputRef.current.blur();
    }
  }, [searchActive]);

  return (
    <div className="results-header">
      <div className="results-header__info">
        <span className="results-header__count">{count} items</span>
      </div>

      <div className="results-header__actions">
        {/* Search icon + expandable input */}
        <div className="results-header__search-wrapper">
          {!searchActive ? (
            <button className="results-header__search-icon" onClick={toggleSearch} aria-label="Search">
              <SearchIcon />
            </button>
          ) : (
            <div className="results-header__search-input-wrap">
              <span className="results-header__search-icon-small"><SearchIcon /></span>
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search products…"
                className="results-header__search-input"
                onBlur={() => { if (!searchValue) setSearchActive(false); }}
              />
              {searchValue && (
                <button className="results-header__search-clear" onClick={handleClear}>×</button>
              )}
            </div>
          )}
        </div>

        {/* View toggles */}
        <div className="results-header__view">
          <button
            className={`results-header__view-btn${viewMode === 'grid' ? ' active' : ''}`}
            onClick={() => onViewChange('grid')}
          >
            <GridIcon />
          </button>
          <button
            className={`results-header__view-btn${viewMode === 'list' ? ' active' : ''}`}
            onClick={() => onViewChange('list')}
          >
            <ListIcon />
          </button>
        </div>

        {/* Filter toggle (mobile) */}
        <button className="results-header__filter-btn" onClick={onFiltersToggle}>
          <FilterIcon />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsHeader;