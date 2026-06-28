import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format, parse, isValid } from 'date-fns';


import { fetchShopInfoThunk } from '../../../store/slices/shopSlice';
import {
  fetchProductsThunk,
  setActiveFilters,
  selectProducts,
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
} from '@solar-icons/react';
import ServiceFilter     from './components/ServiceFilter';
import SearchParamsPanel from './components/SearchParamsPanel';
import PriceFilter       from './components/PriceFilter';
import ProductGrid       from './components/ProductGrid';
import Pagination        from './components/Pagination';
import ResultsHeader     from './components/ResultsHeader';
import './Results.css';

// ─── Full-width search bar ────────────────────────────────────────────────────
const ResultsSearchBar = ({ onSearch, filtersOpen, onFiltersToggle }) => {
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
      <div className="results-fullsearch__divider" />
      <button
        className={`results-fullsearch__filter${filtersOpen ? ' active' : ''}`}
        onClick={onFiltersToggle}
        aria-label="Toggle filters"
      >
        <SolarFilter size={16} />
        <span>Filters</span>
      </button>
    </div>
  );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseDateStr(str) {
  if (!str) return undefined;
  const d = parse(str, 'yyyy-MM-dd', new Date());
  return isValid(d) ? d : undefined;
}

function fmtReadable(str) {
  const d = parseDateStr(str);
  return d ? format(d, 'EEE, dd MMM') : '—';
}

// ─── Edit sheet — wraps ShopSearchForm ───────────────────────────────────────
const EditDateSheet = ({ onClose }) => (
  <>
    <div className="results-edit-overlay" onClick={onClose} aria-hidden="true" />
    <div className="results-edit-sheet" role="dialog" aria-modal="true" aria-label="Edit search">
      <div className="results-edit-sheet__header">
        <h3 className="results-edit-sheet__title">Edit Search</h3>
        <button type="button" className="results-edit-sheet__close" onClick={onClose} aria-label="Close">
          <XIcon size={22} />
        </button>
      </div>
      <div className="results-edit-sheet__body">
        <ShopSearchForm />
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

  const [viewMode,      setViewMode]      = useState('grid');
  const [filtersOpen,   setFiltersOpen]   = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);

  const [localPickupDate, setLocalPickupDate] = useState(baseParams.pickup_date || '');
  const [localReturnDate, setLocalReturnDate] = useState(baseParams.return_date || '');
  const [localPickupTime, setLocalPickupTime] = useState(baseParams.pickup_time || '');
  const [localReturnTime, setLocalReturnTime] = useState(baseParams.return_time || '');
  const [localMinPrice,   setLocalMinPrice]   = useState(activeFilters.min_price || '');
  const [localMaxPrice,   setLocalMaxPrice]   = useState(activeFilters.max_price || '');

  const [isDateRangeValid,  setIsDateRangeValid]  = useState(true);
  const [isPriceRangeValid, setIsPriceRangeValid] = useState(true);
  const [dateRangeError,    setDateRangeError]    = useState('');

  const isUpdateValid = isDateRangeValid && isPriceRangeValid;

  useEffect(() => {
    setLocalPickupDate(baseParams.pickup_date || '');
    setLocalReturnDate(baseParams.return_date || '');
    setLocalPickupTime(baseParams.pickup_time || '');
    setLocalReturnTime(baseParams.return_time || '');
  }, [baseParams]);

  useEffect(() => {
    setLocalMinPrice(activeFilters.min_price || '');
    setLocalMaxPrice(activeFilters.max_price || '');
  }, [activeFilters.min_price, activeFilters.max_price]);

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
        service_id:   null,
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
    if (serviceId && String(serviceId).includes(',')) {
      dispatch(setActiveFilters({ service_ids: serviceId, service_id: null }));
      doFetch({ service_ids: serviceId, service_id: null });
    } else {
      dispatch(setActiveFilters({ service_id: serviceId, service_ids: null }));
      doFetch({ service_id: serviceId, service_ids: null });
    }
  };

  const handleSearch = (keyword) => {
    dispatch(setActiveFilters({ search_value: keyword || null }));
    doFetch({ search_value: keyword || null });
  };

  const handleUpdateSearch = () => {
    const newBase    = { pickup_date: localPickupDate, return_date: localReturnDate, pickup_time: localPickupTime || null, return_time: localReturnTime || null };
    const newFilters = { min_price: localMinPrice || null, max_price: localMaxPrice || null };
    dispatch(setActiveFilters(newFilters));
    doFetch(newFilters, newBase);
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
          selectedId={activeFilters.service_ids ?? activeFilters.service_id ?? null}
          onSelect={handleServiceSelect}
        />

        {/* Full-width search bar */}
        <ResultsSearchBar onSearch={handleSearch} filtersOpen={filtersOpen} onFiltersToggle={() => setFiltersOpen((o) => !o)} />

        {/* Two-column layout */}
        <div className="results-layout">
          <aside className={`results-sidebar${filtersOpen ? ' results-sidebar--open' : ''}`}>
            <SearchParamsPanel
              pickupDate={localPickupDate}  setPickupDate={setLocalPickupDate}
              pickupTime={localPickupTime}  setPickupTime={setLocalPickupTime}
              returnDate={localReturnDate}  setReturnDate={setLocalReturnDate}
              returnTime={localReturnTime}  setReturnTime={setLocalReturnTime}
              onValidityChange={(v, e) => { setIsDateRangeValid(v); setDateRangeError(e); }}
            />
            <PriceFilter
              minPrice={localMinPrice}  setMinPrice={setLocalMinPrice}
              maxPrice={localMaxPrice}  setMaxPrice={setLocalMaxPrice}
              onValidityChange={setIsPriceRangeValid}
            />
            <button type="button" className="search-params-btn" onClick={handleUpdateSearch} disabled={!isUpdateValid}>
              Update Search
            </button>
            {dateRangeError && <p className="search-params-error">{dateRangeError}</p>}
          </aside>

          <main className="results-main">
            {loading && (
              <div className="results-loading">
                <div className="results-spinner" />
                <p>Loading products…</p>
              </div>
            )}
            {error && !loading && (
              <div className="results-error">
                <p><WarningIcon size={16} /> {error}</p>
                <button type="button" className="results-retry-btn" onClick={() => doFetch()}>Retry</button>
              </div>
            )}
            {!loading && !error && (
              <>
                <ProductGrid products={products} viewMode={viewMode} shop={shop} baseParams={baseParams} isOrganization={isOrganization} associatedShops={associatedShops} />
                <Pagination next={nextUrl} previous={prevUrl} />
              </>
            )}
          </main>
        </div>
      </div>

      {/* Edit sheet — portalled so it's never trapped inside any container */}
      {editSheetOpen && createPortal(
        <EditDateSheet onClose={() => setEditSheetOpen(false)} />,
        document.body
      )}
    </div>
  );
};

export default ResultsPage;
