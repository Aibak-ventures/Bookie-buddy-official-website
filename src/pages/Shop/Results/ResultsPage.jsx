import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import { format, parse, isValid, startOfDay } from 'date-fns';
import 'react-day-picker/style.css';


import { fetchShopInfoThunk } from '../../../store/slices/shopSlice';
import {
  fetchProductsThunk,
  goToNextPageThunk,
  setActiveFilters,
  selectProducts,
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
  selectProductsNext,
  selectProductsPrev,
  selectIsLoaded,
  selectBaseParams,
  selectActiveFilters,
} from '../../../store/slices/productsSlice';
import { selectShop, selectServices, selectAssociatedShops, selectIsOrganization, selectShopLoading } from '../../../store/slices/shopSlice';

import ShopHeader        from '../components/ShopHeader';
import ShopSearchForm    from '../components/ShopSearchForm';
import {
  AltArrowLeft          as BackArrowIcon,
  DangerTriangle        as WarningIcon,
  Pen2                  as PenIcon,
  CloseCircle           as XIcon,
  MinimalisticMagnifier,
  Filter                as SolarFilter,
  Calendar              as CalendarIcon,
  ClockCircle           as ClockIcon,
} from '@solar-icons/react';
import ServiceFilter     from './components/ServiceFilter';
import FilterSheet       from './components/FilterSheet';
import ProductGrid       from './components/ProductGrid';
import Pagination        from './components/Pagination';
import ResultsHeader     from './components/ResultsHeader';
import './Results.css';

// ─── Full-width search bar ────────────────────────────────────────────────────
const ResultsSearchBar = ({ onSearch, filtersOpen, filtersActive, onFiltersToggle, showFilterBtn }) => {
  const [value, setValue] = useState('');
  const timerRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch(e.target.value.trim()), 400);
  };

  const handleClear = () => { setValue(''); onSearch(''); };

  return (
    <div className="results-fullsearch">
      <MinimalisticMagnifier size={16} className="results-fullsearch__icon" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search products…"
        className="results-fullsearch__input"
      />
      {value && (
        <button className="results-fullsearch__clear" onClick={handleClear} aria-label="Clear">×</button>
      )}
      {showFilterBtn && (
        <>
          <div className="results-fullsearch__divider" />
          <button
            className={`results-fullsearch__filter${filtersOpen || filtersActive ? ' active' : ''}`}
            onClick={onFiltersToggle}
            aria-label="Toggle filters"
          >
            <SolarFilter size={16} />
            <span>Filters</span>
          </button>
        </>
      )}
    </div>
    
  );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const today = startOfDay(new Date());

function parseDateStr(str) {
  if (!str) return undefined;
  const d = parse(str, 'yyyy-MM-dd', new Date());
  return isValid(d) ? d : undefined;
}

function useResponsiveMonths() {
  const [months, setMonths] = useState(() => window.innerWidth >= 768 ? 2 : 1);
  useEffect(() => {
    const handleResize = () => setMonths(window.innerWidth >= 768 ? 2 : 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return months;
}

function fmtReadable(str) {
  const d = parseDateStr(str);
  return d ? format(d, 'EEE, dd MMM') : '—';
}

// ─── Edit sheet — wraps ShopSearchForm ───────────────────────────────────────
const EditDateSheet = ({ baseParams, onClose }) => (
  <>
    <div className="results-edit-overlay" onClick={onClose} aria-hidden="true" />
    <div className="results-edit-sheet" role="dialog" aria-modal="true" aria-label="Edit search">
      <div className="results-edit-sheet__body">
        <ShopSearchForm
          compact
          initialPickupDate={baseParams.pickup_date}
          initialReturnDate={baseParams.return_date}
          initialPickupTime={baseParams.pickup_time}
          initialReturnTime={baseParams.return_time}
          onAfterSubmit={onClose}
        />
      </div>
    </div>
  </>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const ResultsPage = () => {
  const { shopName, publicToken } = useParams();
  const [searchParams]            = useSearchParams();
  const navigate                  = useNavigate();
  const dispatch                  = useDispatch();

  const shop            = useSelector(selectShop);
  const services        = useSelector(selectServices);
  const associatedShops = useSelector(selectAssociatedShops);
  const isOrganization  = useSelector(selectIsOrganization);
  const shopLoading     = useSelector(selectShopLoading);
  const products        = useSelector(selectProducts);
  const loading         = useSelector(selectProductsLoading);
  const error           = useSelector(selectProductsError);
  const nextUrl         = useSelector(selectProductsNext);
  const prevUrl         = useSelector(selectProductsPrev);
  const isLoaded        = useSelector(selectIsLoaded);
  const baseParams      = useSelector(selectBaseParams);
  const activeFilters   = useSelector(selectActiveFilters);
  const allProducts     = useSelector(selectAllProducts);

  const [viewMode,         setViewMode]         = useState('grid');
  const [filterSheetOpen,  setFilterSheetOpen]  = useState(false);
  const [editSheetOpen,    setEditSheetOpen]    = useState(false);

  // Detect mobile/tablet (≤1024px) for infinite scroll
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Infinite scroll sentinel — stable observer, state via refs to avoid recreating on every change
  const sentinelRef  = useRef(null);
  const nextUrlRef   = useRef(nextUrl);
  const loadingRef   = useRef(loading);
  useEffect(() => { nextUrlRef.current = nextUrl; }, [nextUrl]);
  useEffect(() => { loadingRef.current = loading; }, [loading]);

  useEffect(() => {
    if (!isMobile || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextUrlRef.current && !loadingRef.current) {
          dispatch(goToNextPageThunk());
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [isMobile, dispatch]); // stable — never recreated after mount

  const [localPickupDate, setLocalPickupDate] = useState(baseParams.pickup_date || '');
  const [localReturnDate, setLocalReturnDate] = useState(baseParams.return_date || '');
  const [localPickupTime, setLocalPickupTime] = useState(baseParams.pickup_time || '');
  const [localReturnTime, setLocalReturnTime] = useState(baseParams.return_time || '');
  const [localMinPrice,   setLocalMinPrice]   = useState(activeFilters.min_price || '');
  const [localMaxPrice,   setLocalMaxPrice]   = useState(activeFilters.max_price || '');
  const [localShopIds,    setLocalShopIds]    = useState(activeFilters.shop_ids ?? []);

  // Sidebar DayPicker state
  const monthsCount = useResponsiveMonths();
  const [sidebarCalOpen,  setSidebarCalOpen]  = useState(false);
  const [sidebarCalKey,   setSidebarCalKey]   = useState(0);
  const [sidebarTempRange, setSidebarTempRange] = useState({ from: undefined, to: undefined });

  const openSidebarCal = () => {
    setSidebarTempRange({
      from: parseDateStr(localPickupDate),
      to:   parseDateStr(localReturnDate),
    });
    setSidebarCalOpen(true);
  };
  const closeSidebarCal = () => setSidebarCalOpen(false);
  const clearSidebarDates = () => {
    setSidebarTempRange({ from: undefined, to: undefined });
    setSidebarCalKey((k) => k + 1);
  };
  const confirmSidebarDates = () => {
    if (sidebarTempRange.from && sidebarTempRange.to) {
      const newPickup = format(sidebarTempRange.from, 'yyyy-MM-dd');
      const newReturn = format(sidebarTempRange.to,   'yyyy-MM-dd');
      setLocalPickupDate(newPickup);
      setLocalReturnDate(newReturn);
      setSidebarCalOpen(false);
      // Instant apply — dates are now valid, fire immediately
      const newBase = { pickup_date: newPickup, return_date: newReturn, pickup_time: localPickupTime || null, return_time: localReturnTime || null };
      doFetch({}, newBase);
    } else {
      setLocalPickupDate('');
      setLocalReturnDate('');
      setSidebarCalOpen(false);
    }
  };

  const sidebarCalHint = !sidebarTempRange.from
    ? 'Select your pickup date'
    : !sidebarTempRange.to
    ? 'Now select your return date'
    : `${format(sidebarTempRange.from, 'dd MMM yyyy')}  →  ${format(sidebarTempRange.to, 'dd MMM yyyy')}`;

  useEffect(() => {
    if (sidebarCalOpen) { document.body.style.overflow = 'hidden'; }
    else                { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarCalOpen]);

  // Inline date validation
  const dateRangeError = (() => {
    if (!localPickupDate || !localReturnDate) return 'Select both pickup and return dates.';
    const p = new Date(`${localPickupDate}T${localPickupTime || '00:00'}`);
    const r = new Date(`${localReturnDate}T${localReturnTime || '00:00'}`);
    if (localPickupDate === localReturnDate) {
      if (!localPickupTime || !localReturnTime) return 'Both times required for same-day rental.';
      if (r <= p) return 'Return time must be after pickup time.';
    } else if (r <= p) {
      return 'Return date must be after pickup date.';
    }
    return '';
  })();
  const isPriceRangeValid = !(localMinPrice && localMaxPrice && Number(localMinPrice) >= Number(localMaxPrice));

  useEffect(() => {
    setLocalPickupDate(baseParams.pickup_date || '');
    setLocalReturnDate(baseParams.return_date || '');
    setLocalPickupTime(baseParams.pickup_time || '');
    setLocalReturnTime(baseParams.return_time || '');
  }, [baseParams]);

  useEffect(() => {
    setLocalMinPrice(activeFilters.min_price || '');
    setLocalMaxPrice(activeFilters.max_price || '');
    setLocalShopIds(activeFilters.shop_ids ?? []);
  }, [activeFilters.min_price, activeFilters.max_price, activeFilters.shop_ids]);

  useEffect(() => {
    if (!shop && !shopLoading) dispatch(fetchShopInfoThunk(publicToken));
  }, [publicToken, shop, shopLoading, dispatch]);

  useEffect(() => {
    const urlPickup = searchParams.get('pickup_date');
    const urlReturn = searchParams.get('return_date');
    const alreadyLoaded =
      isLoaded &&
      baseParams.publicToken === publicToken &&
      baseParams.pickup_date === urlPickup &&
      baseParams.return_date === urlReturn;

    if (alreadyLoaded) return;

    const urlServiceIds = searchParams.get('service_ids') || null;
    dispatch(fetchProductsThunk({
      publicToken,
      baseParams: {
        pickup_date: urlPickup  || '',
        return_date: urlReturn  || '',
        pickup_time: searchParams.get('pickup_time') || null,
        return_time: searchParams.get('return_time') || null,
      },
      activeFilters: {
        search_value: searchParams.get('search_value') || null,
        service_ids:  urlServiceIds,
        min_price:    null,
        max_price:    null,
      },
    }));
  }, [publicToken, searchParams, dispatch, isLoaded, baseParams]);

  useEffect(() => {
    if (shop?.name) document.title = `Search — ${shop.name}`;
    return () => { document.title = 'BookieBuddy'; };
  }, [shop]);

  const doFetch = useCallback((filterOverrides = {}, newBase = null) => {
    dispatch(fetchProductsThunk({
      publicToken,
      baseParams:    newBase ?? baseParams,
      activeFilters: { ...activeFilters, ...filterOverrides },
    }));
  }, [publicToken, baseParams, activeFilters, dispatch]);

  const handleServiceSelect = (serviceId) => {
    dispatch(setActiveFilters({ service_ids: serviceId || null }));
    doFetch({ service_ids: serviceId || null });
  };

  const handleSearch = (keyword) => {
    dispatch(setActiveFilters({ search_value: keyword || null }));
    doFetch({ search_value: keyword || null });
  };

  const handleBackToShop = () => navigate(`/shop/${shopName}/${publicToken}`);


  return (
    <div className="results-page">
      <ShopHeader shop={shop} />

      <div className="results-container">
        {/* Top bar */}
        <div className="results-top-bar">
          {/* Left: back icon + date preview + edit */}
          <div className="results-top-bar__left">
            <button type="button" className="results-back-btn" onClick={handleBackToShop} aria-label="Back to shop">
              <BackArrowIcon size={18} />
              <span className="results-back-btn__label">Back to home</span>
            </button>
            <button type="button" className="results-date-preview" onClick={() => setEditSheetOpen(true)} aria-label="Edit search dates">
              <span className="results-date-preview__pill">{fmtReadable(baseParams.pickup_date)}</span>
              <span className="results-date-preview__arrow">→</span>
              <span className="results-date-preview__pill">{fmtReadable(baseParams.return_date)}</span>
              <span className="results-date-preview__edit"><PenIcon size={16} /></span>
            </button>
          </div>

          {/* Right: search bar with filter inside + view toggle */}
          <ResultsHeader
            viewMode={viewMode}
            onViewChange={setViewMode}
          />
        </div>

        {/* Service chips */}
        <ServiceFilter
          services={services}
          selectedId={activeFilters.service_ids ?? null}
          onSelect={handleServiceSelect}
        />

        {/* Full-width search bar */}
        <ResultsSearchBar
          onSearch={handleSearch}
          filtersOpen={filterSheetOpen}
          filtersActive={!!(activeFilters.min_price || activeFilters.max_price || (activeFilters.shop_ids?.length > 0))}
          onFiltersToggle={() => setFilterSheetOpen((o) => !o)}
          showFilterBtn={isMobile}
        />

        {/* Two-column layout */}
        <div className="results-layout">
          <aside className="results-sidebar">
            {/* ── Dates & Times ── */}
            <div className="sidebar-section">
              <p className="sidebar-section__title">Dates &amp; Times</p>

              {/* Pickup row */}
              <p className="sidebar-group-label">Pickup</p>
              <div className="sidebar-date-row">
                <div className="sidebar-field">
                  <label className="sidebar-label"><CalendarIcon size={13} /> Date <span className="sidebar-required">*</span></label>
                  <button type="button"
                    className={`shop-datepicker-trigger sidebar-datepicker-trigger${localPickupDate ? ' shop-datepicker-trigger--selected' : ''}`}
                    onClick={openSidebarCal}>
                    <span>{localPickupDate ? format(parseDateStr(localPickupDate), 'dd MMM yyyy') : 'Select date'}</span>
                    <CalendarIcon size={13} />
                  </button>
                </div>
                <div className="sidebar-field">
                  <label className="sidebar-label"><ClockIcon size={13} /> Time <span className="sidebar-optional">(opt)</span></label>
                  <input type="time" value={localPickupTime}
                    onChange={(e) => setLocalPickupTime(e.target.value)}
                    onBlur={(e) => {
                      if (!localPickupDate || !localReturnDate) return;
                      doFetch({}, { pickup_date: localPickupDate, return_date: localReturnDate, pickup_time: e.target.value || null, return_time: localReturnTime || null });
                    }}
                    className="sidebar-input" />
                </div>
              </div>

              {/* Return row */}
              <p className="sidebar-group-label">Return</p>
              <div className="sidebar-date-row">
                <div className="sidebar-field">
                  <label className="sidebar-label"><CalendarIcon size={13} /> Date <span className="sidebar-required">*</span></label>
                  <button type="button"
                    className={`shop-datepicker-trigger sidebar-datepicker-trigger${localReturnDate ? ' shop-datepicker-trigger--selected' : ''}`}
                    onClick={openSidebarCal}>
                    <span>{localReturnDate ? format(parseDateStr(localReturnDate), 'dd MMM yyyy') : 'Select date'}</span>
                    <CalendarIcon size={13} />
                  </button>
                </div>
                <div className="sidebar-field">
                  <label className="sidebar-label"><ClockIcon size={13} /> Time <span className="sidebar-optional">(opt)</span></label>
                  <input type="time" value={localReturnTime}
                    onChange={(e) => setLocalReturnTime(e.target.value)}
                    onBlur={(e) => {
                      if (!localPickupDate || !localReturnDate) return;
                      doFetch({}, { pickup_date: localPickupDate, return_date: localReturnDate, pickup_time: localPickupTime || null, return_time: e.target.value || null });
                    }}
                    className="sidebar-input" />
                </div>
              </div>

              {dateRangeError && <p className="sidebar-error">{dateRangeError}</p>}
            </div>

            <div className="sidebar-divider" />

            {/* ── Location ── */}
            {associatedShops?.length > 0 && (
              <>
                <div className="sidebar-section">
                  <p className="sidebar-section__title">
                    Location
                    {localShopIds.length > 0 && (
                      <span className="sidebar-section__count">{localShopIds.length} selected</span>
                    )}
                  </p>
                  <div className="filter-sheet__locations">
                    {associatedShops.map((loc) => {
                      const active = localShopIds.includes(loc.id);
                      return (
                        <button key={loc.id} type="button"
                          className={`filter-location-chip${active ? ' filter-location-chip--active' : ''}`}
                          onClick={() => {
                            const next = active ? localShopIds.filter((x) => x !== loc.id) : [...localShopIds, loc.id];
                            setLocalShopIds(next);
                            const shop_ids = next.length > 0 ? next : null;
                            dispatch(setActiveFilters({ shop_ids }));
                            doFetch({ shop_ids });
                          }}
                        >
                          {loc.place}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="sidebar-divider" />
              </>
            )}

            {/* ── Price ── */}
            <div className="sidebar-section">
              <p className="sidebar-section__title">Price Range</p>
              <div className="filter-sheet__price-row">
                <div className="filter-sheet__price-field">
                  <label className="filter-sheet__price-label">Min</label>
                  <div className="filter-sheet__price-input-wrap">
                    <span className="filter-sheet__price-symbol">₹</span>
                    <input type="number" min="0" placeholder="0" value={localMinPrice}
                      onChange={(e) => setLocalMinPrice(e.target.value)}
                      onBlur={(e) => {
                        const min = e.target.value || null;
                        const max = localMaxPrice || null;
                        if (min && max && Number(min) >= Number(max)) return;
                        dispatch(setActiveFilters({ min_price: min }));
                        doFetch({ min_price: min, max_price: max });
                      }}
                      className="filter-sheet__price-input" />
                  </div>
                </div>
                <span className="filter-sheet__price-sep">—</span>
                <div className="filter-sheet__price-field">
                  <label className="filter-sheet__price-label">Max</label>
                  <div className="filter-sheet__price-input-wrap">
                    <span className="filter-sheet__price-symbol">₹</span>
                    <input type="number" min="0" placeholder="Any" value={localMaxPrice}
                      onChange={(e) => setLocalMaxPrice(e.target.value)}
                      onBlur={(e) => {
                        const max = e.target.value || null;
                        const min = localMinPrice || null;
                        if (min && max && Number(min) >= Number(max)) return;
                        dispatch(setActiveFilters({ max_price: max }));
                        doFetch({ min_price: min, max_price: max });
                      }}
                      className="filter-sheet__price-input" />
                  </div>
                </div>
              </div>
              {!isPriceRangeValid && <p className="sidebar-error">Min must be less than max</p>}
            </div>

            {/* ── Actions ── */}
            <div className="sidebar-actions">
              <button type="button" className="filter-sheet__btn filter-sheet__btn--clear sidebar-clear-btn"
                onClick={() => {
                  setLocalMinPrice(''); setLocalMaxPrice(''); setLocalShopIds([]);
                  dispatch(setActiveFilters({ min_price: null, max_price: null, shop_ids: null }));
                  doFetch({ min_price: null, max_price: null, shop_ids: null });
                }}>
                Clear filters
              </button>
            </div>
          </aside>

          <main className="results-main">
            {error && !loading && (
              <div className="results-error">
                <p><WarningIcon size={16} /> {error}</p>
                <button type="button" className="results-retry-btn" onClick={() => doFetch()}>Retry</button>
              </div>
            )}

            {isMobile ? (
              /* ── Infinite scroll (mobile/tablet) ── */
              <>
                <ProductGrid products={allProducts} viewMode={viewMode} shop={shop} baseParams={baseParams} isOrganization={isOrganization} associatedShops={associatedShops} />
                {loading && (
                  <div className="results-load-more">
                    <div className="results-spinner" />
                    <span>Loading more products…</span>
                  </div>
                )}
                {nextUrl && !loading && (
                  <div className="results-more-hint">
                    <span className="results-more-hint__dots"><span /><span /><span /></span>
                    <span>More products below</span>
                  </div>
                )}
                {!nextUrl && !loading && allProducts.length > 0 && (
                  <div className="results-all-caught">
                    <span className="results-all-caught__line" />
                    <span className="results-all-caught__text">You're all caught up</span>
                    <span className="results-all-caught__line" />
                  </div>
                )}
                <div ref={sentinelRef} style={{ height: 1 }} />
              </>
            ) : (
              /* ── Pagination (desktop) ── */
              <>
                {loading && (
                  <div className="results-loading">
                    <div className="results-spinner" />
                    <p>Loading products…</p>
                  </div>
                )}
                {!loading && !error && (
                  <>
                    <ProductGrid products={products} viewMode={viewMode} shop={shop} baseParams={baseParams} isOrganization={isOrganization} associatedShops={associatedShops} />
                    {nextUrl && (
                      <div className="results-more-hint">
                        <span className="results-more-hint__dots"><span /><span /><span /></span>
                        <span>More products on next page</span>
                      </div>
                    )}
                    {!nextUrl && !prevUrl === false && (
                      <div className="results-all-caught">
                        <span className="results-all-caught__line" />
                        <span className="results-all-caught__text">You're all caught up</span>
                        <span className="results-all-caught__line" />
                      </div>
                    )}
                    <Pagination next={nextUrl} previous={prevUrl} />
                  </>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Edit sheet — portalled so it's never trapped inside any container */}
      {editSheetOpen && createPortal(
        <EditDateSheet baseParams={baseParams} onClose={() => setEditSheetOpen(false)} />,
        document.body
      )}

      {/* Sidebar DayPicker calendar — portalled so it's never clipped by sidebar overflow */}
      {sidebarCalOpen && createPortal(
        <>
          <div className="shop-cal-overlay" onClick={closeSidebarCal} aria-hidden="true" />
          <div className="shop-cal-modal" role="dialog" aria-modal="true" aria-label="Select dates">
            <div className="shop-cal-modal__handle" aria-hidden="true" />
            <div className="shop-cal-modal__header">
              <span className="shop-cal-modal__hint">{sidebarCalHint}</span>
              <button type="button" className="shop-cal-modal__close" onClick={closeSidebarCal} aria-label="Close calendar">
                <XIcon />
              </button>
            </div>
            <div className="shop-cal-modal__body">
              <DayPicker
                key={sidebarCalKey}
                mode="range"
                selected={sidebarTempRange}
                onSelect={(r) => { if (r) setSidebarTempRange({ from: r.from, to: r.to }); }}
                disabled={{ before: today }}
                defaultMonth={sidebarTempRange.from || today}
                numberOfMonths={monthsCount}
              />
            </div>
            <div className="shop-cal-modal__footer">
              <button type="button" onClick={clearSidebarDates} className="shop-datepicker-btn shop-datepicker-btn--clear">Clear</button>
              <button type="button" onClick={confirmSidebarDates} className="shop-datepicker-btn shop-datepicker-btn--ok">Confirm Dates</button>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Filter sheet — mobile/tablet only */}
      <FilterSheet
        open={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        minPrice={localMinPrice}
        maxPrice={localMaxPrice}
        selectedShopIds={activeFilters.shop_ids ?? []}
        locations={associatedShops ?? []}
        onApply={({ min_price, max_price, shop_ids }) => {
          setLocalMinPrice(min_price || '');
          setLocalMaxPrice(max_price || '');
          dispatch(setActiveFilters({ min_price, max_price, shop_ids: shop_ids ?? null }));
          doFetch({ min_price, max_price, shop_ids: shop_ids ?? null });
        }}
        onClearAll={() => {
          setLocalMinPrice('');
          setLocalMaxPrice('');
          dispatch(setActiveFilters({ min_price: null, max_price: null, shop_ids: null }));
          doFetch({ min_price: null, max_price: null, shop_ids: null });
        }}
      />
    </div>
  );
};

export default ResultsPage;
