import { useEffect } from 'react';

/**
 * PriceFilter – min/max price inputs with validation.
 * Calls onValidityChange(isValid) whenever values change.
 */
const PriceFilter = ({ 
  minPrice, setMinPrice, 
  maxPrice, setMaxPrice,
  onValidityChange  // new prop
}) => {
  const handleClear = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  // Validate price range (ignore empty fields)
  useEffect(() => {
    let isValid = true;
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    if (min !== null && max !== null && min >= max) {
      isValid = false;
    }
    onValidityChange?.(isValid);
  }, [minPrice, maxPrice, onValidityChange]);

  return (
    <div className="price-filter">
      <p className="price-filter__heading">💰 Price Range</p>
      <div className="price-filter__row">
        <input
          type="number"
          min="0"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="price-filter__input"
        />
        <span className="price-filter__sep">–</span>
        <input
          type="number"
          min="0"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="price-filter__input"
        />
      </div>
      {(minPrice || maxPrice) && (
        <div className="price-filter__actions">
          <button type="button" className="price-filter__btn price-filter__btn--clear" onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;