import { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import { selectShop, selectServices, selectIsOrganization, selectShopLoading } from '../../../store/slices/shopSlice';

import ShopHeader        from '../components/ShopHeader';
import ServiceFilter     from './components/ServiceFilter';
import SearchParamsPanel from './components/SearchParamsPanel';
import PriceFilter       from './components/PriceFilter';
import ProductGrid       from './components/ProductGrid';
import Pagination        from './components/Pagination';
import ResultsHeader     from './components/ResultsHeader';
import './Results.css';

const ResultsPage = () => {
  const { shopName, publicToken } = useParams();
  const [searchParams]            = useSearchParams();
  const navigate                  = useNavigate();
  const dispatch                  = useDispatch();

  // Redux state
  const shop           = useSelector(selectShop);
  const services       = useSelector(selectServices);
  const isOrganization = useSelector(selectIsOrganization);
  const shopLoading    = useSelector(selectShopLoading);
  const products      = useSelector(selectProducts);
  const loading       = useSelector(selectProductsLoading);
  const error         = useSelector(selectProductsError);
  const nextUrl       = useSelector(selectProductsNext);
  const prevUrl       = useSelector(selectProductsPrev);
  const isLoaded      = useSelector(selectIsLoaded);
  const baseParams    = useSelector(selectBaseParams);
  const activeFilters = useSelector(selectActiveFilters);

  // UI‑only
  const [viewMode,    setViewMode]    = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Local state for editable filters
  const [localPickupDate, setLocalPickupDate] = useState(baseParams.pickup_date || '');
  const [localReturnDate, setLocalReturnDate] = useState(baseParams.return_date || '');
  const [localPickupTime, setLocalPickupTime] = useState(baseParams.pickup_time || '');
  const [localReturnTime, setLocalReturnTime] = useState(baseParams.return_time || '');
  const [localMinPrice,   setLocalMinPrice]   = useState(activeFilters.min_price || '');
  const [localMaxPrice,   setLocalMaxPrice]   = useState(activeFilters.max_price || '');

  // Validation states
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const [isPriceRangeValid, setIsPriceRangeValid] = useState(true);
  const [dateRangeError, setDateRangeError] = useState('');

  // Combined validity for Update Search button
  const isUpdateValid = isDateRangeValid && isPriceRangeValid;

  // Sync local state with Redux when store changes
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

  // Load shop info if missing
  useEffect(() => {
    if (!shop && !shopLoading) {
      dispatch(fetchShopInfoThunk(publicToken));
    }
  }, [publicToken, shop, shopLoading, dispatch]);

  // Initial fetch from URL
  useEffect(() => {
    const urlPickup = searchParams.get('pickup_date');
    const urlReturn = searchParams.get('return_date');
    const alreadyLoaded =
      isLoaded &&
      baseParams.publicToken === publicToken &&
      baseParams.pickup_date === urlPickup &&
      baseParams.return_date === urlReturn;

    if (alreadyLoaded) return;

    const freshBase = {
      pickup_date: urlPickup  || '',
      return_date: urlReturn  || '',
      pickup_time: searchParams.get('pickup_time')  || null,
      return_time: searchParams.get('return_time')  || null,
    };
    const freshFilters = {
      search_value: searchParams.get('search_value') || null,
      service_id:   null,
      min_price:    null,
      max_price:    null,
    };
    dispatch(fetchProductsThunk({
      publicToken,
      baseParams:    freshBase,
      activeFilters: freshFilters,
    }));
  }, [publicToken, searchParams, dispatch, isLoaded, baseParams]);

  // Document title
  useEffect(() => {
    if (shop?.name) document.title = `Search — ${shop.name}`;
    return () => { document.title = 'BookieBuddy'; };
  }, [shop]);

  // Unified fetch – uses current Redux baseParams + activeFilters
  const doFetch = useCallback((filterOverrides = {}, newBase = null) => {
    const effectiveBase    = newBase ?? baseParams;
    const effectiveFilters = { ...activeFilters, ...filterOverrides };
    dispatch(fetchProductsThunk({
      publicToken,
      baseParams:    effectiveBase,
      activeFilters: effectiveFilters,
    }));
  }, [publicToken, baseParams, activeFilters, dispatch]);

  // Handlers
  const handleServiceSelect = (serviceId) => {
    // Org services use comma-separated IDs (e.g. "7,47") → service_ids param.
    // Shop services use a single ID string → service_id param.
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
    const newBase = {
      pickup_date: localPickupDate,
      return_date: localReturnDate,
      pickup_time: localPickupTime || null,
      return_time: localReturnTime || null,
    };
    const newFilters = {
      min_price: localMinPrice || null,
      max_price: localMaxPrice || null,
    };
    dispatch(setActiveFilters(newFilters));
    doFetch(newFilters, newBase);
  };

  const handleBackToShop = () => {
    navigate(`/shop/${shopName}/${publicToken}`);
  };

  const handleDateValidityChange = (isValid, error) => {
    setIsDateRangeValid(isValid);
    setDateRangeError(error);
  };

  const handlePriceValidityChange = (isValid) => {
    setIsPriceRangeValid(isValid);
  };

  return (
    <div className="results-page">
      <ShopHeader shop={shop} />

      <div className="results-container">
        {/* Top bar */}
        <div className="results-top-bar">
          <button type="button" className="results-back-btn" onClick={handleBackToShop}>
            ← Back to Shop
          </button>
          <ResultsHeader
            count={products.length}
            viewMode={viewMode}
            onViewChange={setViewMode}
            filtersOpen={filtersOpen}
            onFiltersToggle={() => setFiltersOpen((o) => !o)}
            onSearch={handleSearch}
          />
        </div>

        {/* Service chips */}
        <ServiceFilter
          services={services}
          selectedId={activeFilters.service_ids ?? activeFilters.service_id ?? null}
          onSelect={handleServiceSelect}
        />

        {/* Two‑column layout */}
        <div className="results-layout">
          {/* Sidebar */}
          <aside className={`results-sidebar${filtersOpen ? ' results-sidebar--open' : ''}`}>
            <SearchParamsPanel
              pickupDate={localPickupDate}
              setPickupDate={setLocalPickupDate}
              pickupTime={localPickupTime}
              setPickupTime={setLocalPickupTime}
              returnDate={localReturnDate}
              setReturnDate={setLocalReturnDate}
              returnTime={localReturnTime}
              setReturnTime={setLocalReturnTime}
              onValidityChange={handleDateValidityChange}
            />
            <PriceFilter
              minPrice={localMinPrice}
              setMinPrice={setLocalMinPrice}
              maxPrice={localMaxPrice}
              setMaxPrice={setLocalMaxPrice}
              onValidityChange={handlePriceValidityChange}
            />
            <button
              type="button"
              className="search-params-btn"
              onClick={handleUpdateSearch}
              disabled={!isUpdateValid}
            >
              Update Search
            </button>
            {dateRangeError && <p className="search-params-error">{dateRangeError}</p>}
          </aside>

          {/* Products */}
          <main className="results-main">
            {loading && (
              <div className="results-loading">
                <div className="results-spinner" />
                <p>Loading products…</p>
              </div>
            )}
            {error && !loading && (
              <div className="results-error">
                <p>⚠️ {error}</p>
                <button type="button" className="results-retry-btn" onClick={() => doFetch()}>
                  Retry
                </button>
              </div>
            )}
            {!loading && !error && (
              <>
                <ProductGrid products={products} viewMode={viewMode} shop={shop} baseParams={baseParams} isOrganization={isOrganization} />
                <Pagination next={nextUrl} previous={prevUrl} />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;