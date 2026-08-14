import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseCircle as XIcon, CheckCircle as CheckIcon } from '@solar-icons/react';

const FilterSheet = ({
  open,
  onClose,
  minPrice,
  maxPrice,
  selectedShopIds = [],  // number[]
  locations = [],        // [{ id, place }] — associatedShops from Redux
  onApply,
  onClearAll,
}) => {
  const [localMin,      setLocalMin]      = useState(minPrice || '');
  const [localMax,      setLocalMax]      = useState(maxPrice || '');
  const [localShopIds,  setLocalShopIds]  = useState(selectedShopIds);
  const [priceError,    setPriceError]    = useState('');

  useEffect(() => {
    if (open) {
      setLocalMin(minPrice || '');
      setLocalMax(maxPrice || '');
      setLocalShopIds(selectedShopIds);
      setPriceError('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const min = localMin ? Number(localMin) : null;
    const max = localMax ? Number(localMax) : null;
    if (min !== null && max !== null && min >= max) {
      setPriceError('Min price must be less than max price');
    } else {
      setPriceError('');
    }
  }, [localMin, localMax]);

  if (!open) return null;

  const toggleShop = (id) => {
    setLocalShopIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleClearAll = () => {
    setLocalMin('');
    setLocalMax('');
    setLocalShopIds([]);
    setPriceError('');
    onClearAll?.();
    onClose();
  };

  const handleApply = () => {
    if (priceError) return;
    onApply({
      min_price: localMin || null,
      max_price: localMax || null,
      shop_ids:  localShopIds.length > 0 ? localShopIds : null,
    });
    onClose();
  };

  const activeCount = [
    localMin || localMax,
    localShopIds.length > 0,
  ].filter(Boolean).length;

  return createPortal(
    <>
      <div className="filter-sheet-overlay" onClick={onClose} aria-hidden="true" />
      <div className="filter-sheet" role="dialog" aria-modal="true" aria-label="Filter products">
        <div className="filter-sheet__handle" aria-hidden="true" />

        <div className="filter-sheet__header">
          <h2 className="filter-sheet__title">
            Filters
            {activeCount > 0 && <span className="filter-sheet__badge">{activeCount}</span>}
          </h2>
          <button className="filter-sheet__close" onClick={onClose} aria-label="Close filters">
            <XIcon size={20} />
          </button>
        </div>

        <div className="filter-sheet__body">

          {/* ── Location section (multi-select) ── */}
          {locations.length > 0 && (
            <div className="filter-sheet__section">
              <p className="filter-sheet__section-title">
                Location
                {localShopIds.length > 0 && (
                  <span className="filter-sheet__section-count">{localShopIds.length} selected</span>
                )}
              </p>
              <div className="filter-sheet__locations">
                {locations.map((loc) => {
                  const active = localShopIds.includes(loc.id);
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      className={`filter-location-chip${active ? ' filter-location-chip--active' : ''}`}
                      onClick={() => toggleShop(loc.id)}
                    >
                      {active && <CheckIcon size={13} />}
                      {loc.place}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {locations.length > 0 && <div className="filter-sheet__divider" />}

          {/* ── Price section ── */}
          <div className="filter-sheet__section">
            <p className="filter-sheet__section-title">Price Range</p>
            <div className="filter-sheet__price-row">
              <div className="filter-sheet__price-field">
                <label className="filter-sheet__price-label">Min</label>
                <div className="filter-sheet__price-input-wrap">
                  <span className="filter-sheet__price-symbol">₹</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={localMin}
                    onChange={(e) => setLocalMin(e.target.value)}
                    className="filter-sheet__price-input"
                  />
                </div>
              </div>
              <span className="filter-sheet__price-sep">—</span>
              <div className="filter-sheet__price-field">
                <label className="filter-sheet__price-label">Max</label>
                <div className="filter-sheet__price-input-wrap">
                  <span className="filter-sheet__price-symbol">₹</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Any"
                    value={localMax}
                    onChange={(e) => setLocalMax(e.target.value)}
                    className="filter-sheet__price-input"
                  />
                </div>
              </div>
            </div>
            {priceError && <p className="filter-sheet__price-error">{priceError}</p>}
          </div>
        </div>

        <div className="filter-sheet__footer">
          <button
            type="button"
            className="filter-sheet__btn filter-sheet__btn--clear"
            onClick={handleClearAll}
          >
            Clear all
          </button>
          <button
            type="button"
            className="filter-sheet__btn filter-sheet__btn--apply"
            onClick={handleApply}
            disabled={!!priceError}
          >
            Apply filters
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default FilterSheet;
